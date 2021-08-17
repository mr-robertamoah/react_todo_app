function Loader({state, msg, children, className}) {
    return (
        <>
            {
                state ?
                <div 
                    className={`absolute top-0 left-0 w-full h-full z-50 bg-gray-500 bg-opacity-25 
                        text-sm flex justify-center items-center ${className?.length && className}`}>
                    {children ? children : msg.length ? msg : 'loading...'}
                </div> :
                <template></template>
            }
        </>
    )
}

export default Loader