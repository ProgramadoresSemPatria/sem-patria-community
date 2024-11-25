'use client'
import { Button } from '@/components/ui/button'
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
}) => (
  <div className="flex flex-wrap gap-4 pt-4 my-4 border-t-2">
    <Button
      onClick={() => window.open(github, '_blank')}
      variant="outline"
      className="flex items-center space-x-2"
    >
      <Github className="size-4" />
      <span>GitHub</span>
    </Button>
    <Button
      onClick={() => window.open(linkedin, '_blank')}
      variant="outline"
      className="flex items-center space-x-2"
    >
      <Linkedin className="size-4" />
      <span>LinkedIn</span>
    </Button>
    {showEmail && (
      <Button
        onClick={() => window.open(email, '_blank')}
        variant="outline"
        className="flex items-center space-x-2"
      >
        <Mail className="size-4" />
        <span>Email</span>
      </Button>
    )}
  </div>
)

export default SocialLinks
