import { type Note } from '@prisma/client'

// Gera um backup autocontido (HTML legível + JSON bruto embutido) das notas
// do CodeUp de um usuário. O `content` de cada nota é o JSON stringificado de
// um documento TipTap/ProseMirror; aqui ele é convertido para HTML seguro,
// sem depender das extensões do editor. Um pequeno script inline (sem
// nenhuma dependência externa) permite reordenar as notas por data de
// criação e copiar o JSON original de cada nota.

type BackupNote = Pick<Note, 'title' | 'content' | 'createdAt' | 'updatedAt'>

export type CodeUpBackupOptions = {
  notes: readonly BackupNote[]
  generatedAt: Date
  userName?: string | null
  userEmail?: string | null
}

type ProseMirrorMark = {
  type: string
  attrs?: Record<string, unknown>
}

type ProseMirrorNode = {
  type?: string
  text?: string
  marks?: readonly ProseMirrorMark[]
  attrs?: Record<string, unknown>
  content?: readonly ProseMirrorNode[]
}

// Bloqueia esquemas perigosos (ex.: javascript:) em URLs vindas das notas.
const sanitizeLinkHref = (url: string): string => {
  const trimmed = url.trim()
  return /^(https?:|mailto:)/i.test(trimmed) ? trimmed : '#'
}

const sanitizeImageSrc = (url: string): string => {
  const trimmed = url.trim()
  return /^(https?:|data:image\/)/i.test(trimmed) ? trimmed : ''
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const wrapWithMarks = (
  text: string,
  marks: readonly ProseMirrorMark[]
): string =>
  marks.reduce((acc, mark) => {
    switch (mark.type) {
      case 'bold':
        return `<strong>${acc}</strong>`
      case 'italic':
        return `<em>${acc}</em>`
      case 'underline':
        return `<u>${acc}</u>`
      case 'strike':
        return `<s>${acc}</s>`
      case 'code':
        return `<code>${acc}</code>`
      case 'link': {
        const href = sanitizeLinkHref(
          typeof mark.attrs?.href === 'string' ? mark.attrs.href : ''
        )
        return `<a href="${escapeHtml(
          href
        )}" rel="noopener noreferrer">${acc}</a>`
      }
      default:
        return acc
    }
  }, text)

const renderChildren = (nodes: readonly ProseMirrorNode[] = []): string =>
  nodes.map(renderNode).join('')

const renderNode = (node: ProseMirrorNode): string => {
  switch (node.type) {
    case 'text': {
      const text = escapeHtml(node.text ?? '')
      return node.marks?.length ? wrapWithMarks(text, node.marks) : text
    }
    case 'paragraph':
      return `<p>${renderChildren(node.content)}</p>`
    case 'heading': {
      const level = Number(node.attrs?.level)
      const safeLevel = level >= 1 && level <= 6 ? level : 2
      return `<h${safeLevel}>${renderChildren(node.content)}</h${safeLevel}>`
    }
    case 'bulletList':
      return `<ul>${renderChildren(node.content)}</ul>`
    case 'orderedList':
      return `<ol>${renderChildren(node.content)}</ol>`
    case 'listItem':
    case 'taskItem':
      return `<li>${renderChildren(node.content)}</li>`
    case 'taskList':
      return `<ul>${renderChildren(node.content)}</ul>`
    case 'blockquote':
      return `<blockquote>${renderChildren(node.content)}</blockquote>`
    case 'codeBlock':
      return `<pre><code>${renderChildren(node.content)}</code></pre>`
    case 'horizontalRule':
      return '<hr />'
    case 'hardBreak':
      return '<br />'
    case 'image': {
      const src = sanitizeImageSrc(
        typeof node.attrs?.src === 'string' ? node.attrs.src : ''
      )
      const alt = typeof node.attrs?.alt === 'string' ? node.attrs.alt : ''
      if (!src) return ''
      return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />`
    }
    default:
      return renderChildren(node.content)
  }
}

const noteContentToHtml = (content: string | null): string => {
  if (!content) return '<p><em>(sem conteúdo)</em></p>'

  try {
    const doc = JSON.parse(content) as ProseMirrorNode
    const html = renderChildren(doc.content).trim()
    return html || '<p><em>(sem conteúdo)</em></p>'
  } catch {
    // Conteúdo que não é JSON válido: preserva como texto puro.
    return `<p>${escapeHtml(content)}</p>`
  }
}

const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(date)

const BACKUP_STYLES = `
  :root { color-scheme: light dark; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 820px; margin: 0 auto; padding: 2.5rem 1.25rem; color: #1a1a1a; }
  header { border-bottom: 2px solid #f59e0b; padding-bottom: 1rem; margin-bottom: 1.5rem; }
  header h1 { margin: 0 0 .25rem; font-size: 1.6rem; }
  header p { margin: 0; color: #666; font-size: .9rem; }
  header .owner { color: #444; font-weight: 500; }
  .controls { display: flex; align-items: center; gap: .5rem; margin-bottom: 1.5rem; font-size: .9rem; color: #666; }
  .controls select { padding: .35rem .5rem; border-radius: 8px; border: 1px solid #ccc; background: transparent; color: inherit; font: inherit; }
  article { border: 1px solid #e5e5e5; border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; }
  article h2 { margin-top: 0; font-size: 1.25rem; }
  .meta { color: #888; font-size: .8rem; margin-bottom: 1rem; }
  .content img { max-width: 100%; height: auto; }
  pre { background: #f5f5f5; padding: .75rem; border-radius: 8px; overflow-x: auto; }
  details { margin-top: 1rem; }
  summary { cursor: pointer; color: #888; font-size: .8rem; }
  .copy-json { margin: .5rem 0; padding: .35rem .75rem; border-radius: 8px; border: 1px solid #ccc; background: transparent; color: inherit; font-size: .8rem; cursor: pointer; }
  .copy-json:hover { border-color: #f59e0b; }
  @media (prefers-color-scheme: dark) {
    body { color: #e5e5e5; background: #121212; }
    article { border-color: #333; }
    pre { background: #1e1e1e; }
    header p, .meta, summary, .controls { color: #999; }
    header .owner { color: #ccc; }
    .controls select, .copy-json { border-color: #444; }
  }
`

// Script inline do arquivo exportado: ordenação por data de criação e botão
// de copiar o JSON de cada nota. Sem interpolação de dados do usuário.
const BACKUP_SCRIPT = `
  (function () {
    var COPY_FEEDBACK_MS = 2000

    var sortSelect = document.getElementById('sort-order')
    var list = document.getElementById('notes')
    if (sortSelect && list) {
      sortSelect.addEventListener('change', function () {
        var direction = sortSelect.value === 'desc' ? -1 : 1
        var articles = Array.prototype.slice.call(
          list.querySelectorAll('article')
        )
        articles.sort(function (a, b) {
          var createdA = Number(a.getAttribute('data-created-at'))
          var createdB = Number(b.getAttribute('data-created-at'))
          return direction * (createdA - createdB)
        })
        articles.forEach(function (article) {
          list.appendChild(article)
        })
      })
    }

    function showFeedback(button, message) {
      var original = button.getAttribute('data-label') || button.textContent
      button.setAttribute('data-label', original)
      button.textContent = message
      setTimeout(function () {
        button.textContent = original
      }, COPY_FEEDBACK_MS)
    }

    function fallbackCopy(text) {
      var textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      var copied = false
      try {
        copied = document.execCommand('copy')
      } catch (error) {
        copied = false
      }
      document.body.removeChild(textarea)
      return copied
    }

    document.addEventListener('click', function (event) {
      var target = event.target
      var button =
        target && target.closest ? target.closest('.copy-json') : null
      if (!button) return
      var details = button.closest('details')
      var code = details ? details.querySelector('pre code') : null
      if (!code) return
      var text = code.textContent || ''
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () {
            showFeedback(button, 'Copiado!')
          },
          function () {
            showFeedback(
              button,
              fallbackCopy(text) ? 'Copiado!' : 'Falha ao copiar'
            )
          }
        )
        return
      }
      showFeedback(button, fallbackCopy(text) ? 'Copiado!' : 'Falha ao copiar')
    })
  })()
`

const renderNoteArticle = (note: BackupNote): string => {
  const rawJson = escapeHtml(note.content ?? '')
  return `<article data-created-at="${note.createdAt.getTime()}">
    <h2>${escapeHtml(note.title)}</h2>
    <p class="meta">Criada em ${formatDate(
      note.createdAt
    )} · Atualizada em ${formatDate(note.updatedAt)}</p>
    <div class="content">${noteContentToHtml(note.content)}</div>
    <details>
      <summary>Ver dados originais (JSON)</summary>
      <button type="button" class="copy-json">Copiar JSON</button>
      <pre><code>${rawJson}</code></pre>
    </details>
  </article>`
}

export const buildCodeUpBackupHtml = ({
  notes,
  generatedAt,
  userName,
  userEmail
}: CodeUpBackupOptions): string => {
  const articles = notes.length
    ? notes.map(renderNoteArticle).join('\n')
    : '<p>Nenhuma nota encontrada no CodeUp.</p>'

  const ownerLine = [userName, userEmail]
    .filter((value): value is string => Boolean(value))
    .join(' · ')
  const ownerHtml = ownerLine
    ? `<p class="owner">${escapeHtml(ownerLine)}</p>`
    : ''

  const sortControls =
    notes.length > 1
      ? `<div class="controls">
    <label for="sort-order">Ordenar por data de criação:</label>
    <select id="sort-order">
      <option value="asc" selected>Mais antigas primeiro</option>
      <option value="desc">Mais recentes primeiro</option>
    </select>
  </div>`
      : ''

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Backup CodeUp — Borderless Coding</title>
  <style>${BACKUP_STYLES}</style>
</head>
<body>
  <header>
    <h1>Borderless Community - CodeUp Backup</h1>
    ${ownerHtml}
    <p>${notes.length} nota(s) · Exportado em ${formatDate(generatedAt)}</p>
  </header>
  ${sortControls}
  <main id="notes">
  ${articles}
  </main>
  <script>${BACKUP_SCRIPT}</script>
</body>
</html>`
}
