export default function Input({label,placeholder,onChange,type}){
    return(
        <div>
            <h1 className="font-semibold mt-3 text-sm pb-1 ">{label}</h1>
            <input type={type} onChange={onChange} placeholder={placeholder} className="border bg-gray-300 p-1 font-light text-sm rounded"></input>
        </div>
    )
}
