interface TitleProps {
  text: string;
}

function Title({ text }: TitleProps) {
  return <h1 className="font-bold text-4xl text-center">{text}</h1>
}

export default Title
