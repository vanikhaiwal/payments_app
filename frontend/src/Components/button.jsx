export default function Button({label , onClick}){
    return(
        <div>
            <button onClick={onClick} className="bg-black-500 hover:bg-black-300 text-white font-bold py-2 px-4 rounded m-3">{label}</button>
        </div>
    )
}