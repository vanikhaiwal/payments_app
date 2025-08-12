export default function Button({label , onClick}){
    return(
        <div>
            <button onClick={onClick} className="flex flex-col items-center justify-center w-24 h-32 bg-white hover:shadow-md hover:scale-105 text-black rounded-xl m-2">
                <span className="text-3xl mb-1">✅</span>
                <span className="text-sm mt-4 ">{label}</span>
            </button>
        </div>
    )
    }