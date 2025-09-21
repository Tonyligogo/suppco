const Header = ({title, description}) => {
  return (
    <div className="border-b pb-3 mb-5">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export default Header