export function DivInput({children, ...props}) {
    const className = props.className
    return (
        <div className={`flex flex-col justify-center w-full gap-1 ${className}`}>
            {children}
        </div>
    )
}