export default function Button({label , onClick}){
    return(
        <div>
            <button onClick={onClick} className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 w-full mt-3"> 
                {label}   
            </button>
        </div>
    )
    }