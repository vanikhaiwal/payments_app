export default function SubHeading({label ,sublabel}){
    return(
        <div>
        <h2 className="text-black-400  text-center font-semibold">{label}</h2>
        <h2 className="text-black-400  text-center font-semibold">{sublabel}</h2>
    </div>
    )
}