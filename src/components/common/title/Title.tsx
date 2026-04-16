interface TitleProps {
  text: string
}

function Title({ text }: TitleProps) {
  return <h1 className="mb-6 text-center text-4xl font-bold">{text}</h1>
}

export default Title
