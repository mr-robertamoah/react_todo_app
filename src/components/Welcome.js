import { getFormattedDate } from "../helpers"

function Welcome({user, className}) {
    return (
        <div className={` ${className}`}>
            <h1 className="text-sm font-bold">Welcome</h1>
            <div className="text-2xl font-semibold capitalize">{user.name}</div>

            {user.about?.length > 0 && <p className="text-sm text-gray-500">
                {user.about}
            </p>}

            {user.createdAt && <div>
                joined on {getFormattedDate(user.createdAt)}
            </div>}
        </div>
    )
}

export default Welcome
