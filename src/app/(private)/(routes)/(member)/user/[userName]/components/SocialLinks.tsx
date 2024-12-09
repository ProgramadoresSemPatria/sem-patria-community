'use client'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Github, Linkedin, Mail } from 'lucide-react'

const SocialLinks = ({
  github,
  linkedin,
  email,
  showEmail
}: {
  github: string
  linkedin: string
  email: string
  showEmail?: boolean
}) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({ title: 'Email copied to clipboard!' })
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const isGitHubUrl = (input: string) => {
    return /^https:\/\/github\.com\/[a-zA-Z0-9_-]+$/.test(input)
  }
  const githubLink = isGitHubUrl(github)
    ? github
    : `https://github.com/${github}`
  const isLinkedInUrl = (input: string) => {
    return /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/.test(
      input
    )
  }
  const linkedinLink = isLinkedInUrl(linkedin)
    ? linkedin
    : `https://www.linkedin.com/in/${linkedin}`
  return (
    <div className="flex flex-wrap gap-4 pt-4 my-4 border-t-2">
      <Button
        onClick={() => window.open(githubLink, '_blank')}
        variant="outline"
        className="flex items-center space-x-2"
      >
        <Github className="size-4" />
        <span>GitHub</span>
      </Button>
      <Button
        onClick={() => window.open(linkedinLink, '_blank')}
        variant="outline"
        className="flex items-center space-x-2"
      >
        <Linkedin className="w-4 h-4" />
        <span>LinkedIn</span>
      </Button>
      {showEmail && (
        <Button
          onClick={async () => {
            await copyToClipboard(email)
          }}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Mail className="w-4 h-4" />
          <span>Email</span>
        </Button>
      )}
    </div>
  )
}

export default SocialLinks
