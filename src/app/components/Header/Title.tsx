type TitleComponentProps = {
  title: string;
};


export default function Title({ title }: TitleComponentProps ) {
  return (
    <h1 className="text-4xl font-bold">{title}</h1>
  )
}