import { Link } from "react-router-dom"

function NormalLink({to, className, children}) {
    return (
        <Link
          to={to}
          className={`text-blue-500 underline  ${className?.length && className}`}
        >
          {children}
        </Link>
    )
}

export default NormalLink
