export default function(label,placeholder,onChange,type){
    return(
        <div>
            <h1 className="font-semibold mt-3 text-sm">{label}</h1>
            <input type={type} onChange={onChange} placeholder={placeholder} className="border-black bg-gray-300 border-2 p-1 font-light text-base bg"></input>
        </div>
    )
}
