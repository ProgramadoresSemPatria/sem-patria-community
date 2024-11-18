import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail } from 'lucide-react'

const SocialLinks = ({
  github,
  linkedin,
  email
}: {
  github: string
  linkedin: string
  email: string
}) => (
  <div className="flex flex-wrap gap-4 pt-4 my-4 border-t-2">
    <Button variant="outline" className="flex items-center space-x-2">
      <Github className="w-4 h-4" />
      <span>GitHub</span>
    </Button>
    <Button variant="outline" className="flex items-center space-x-2">
      <Linkedin className="w-4 h-4" />
      <span>LinkedIn</span>
    </Button>
    <Button variant="outline" className="flex items-center space-x-2">
      <Mail className="w-4 h-4" />
      <span>Email</span>
    </Button>
  </div>
)

export default SocialLinks
