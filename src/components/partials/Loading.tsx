export const PointsLoading = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex space-x-2">
                <div className="w-4 h-4 bg-green-900 rounded-full animate-bounce delay-100"></div>
                <div className="w-4 h-4 bg-green-900 rounded-full animate-bounce delay-200"></div>
                <div className="w-4 h-4 bg-green-900 rounded-full animate-bounce delay-300"></div>
            </div>
        </div>
    )
}

export const SpinLoading = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="size-8 border-4 border-t-transparent border-green-900 border-solid rounded-full animate-spin"></div>
        </div>
    )
}