import Image from 'next/image'

type EditUserHeaderProps = {
  imageUrl: string
  title: string
  description?: string
}
const EditUserHeader = ({
  imageUrl,
  title,
  description
}: EditUserHeaderProps) => {
  return (
    <>
      <div className="space-y-1 mt-6">
        <div className="flex gap-2 items-end space-x-2">
          <Image
            src={imageUrl}
            width={50}
            height={50}
            alt={title}
            className="rounded-full"
          />
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </>
  )
}

export default EditUserHeader
