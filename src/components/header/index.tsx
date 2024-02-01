type HeaderProps = {
  title: string
  description?: string
}
const Header = ({ title, description }: HeaderProps) => {
  return (
    <>
      <div className="space-y-0.5 mt-6">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </>
  )
}

export default Header
