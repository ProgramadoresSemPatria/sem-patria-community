type HeaderProps = {
  title: string
  children?: React.ReactNode
}
const Header = ({ title, children }: HeaderProps) => {
  return (
    <>
      <div className="space-y-0.5 flex items-center justify-between py-8">
        <h2 className="text-[28px] leading-[34px] tracking-[-0.416px] font-bold">
          {title}
        </h2>
        <div className="flex-end flex gap-2">{children}</div>
      </div>
    </>
  )
}

export default Header
