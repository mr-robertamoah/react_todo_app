import { Link } from "react-router-dom"

function HeaderLink({to, className, children}) {
    return (
        <Link
          to={to}
          className={`header-link  ${className?.length && className}`}
        >
          {children}
        </Link>
    )
}

export default HeaderLink
