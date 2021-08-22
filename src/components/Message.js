function Message({className, defaultMessage, message, condition}) {
    return (
        <div className={`h-44 w-full flex justify-center items-center text-gray-500 text-sm ${className}`}>
            {condition ? message : defaultMessage}
        </div>
    )
}

export default Message