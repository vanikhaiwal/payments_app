import { Link } from "react-router-dom"

export default function BottomText({label,path,text}){
        return(
        <div>
        <p className=" mt-4  text-center">{label}
            <Link to={path} className="cursor-pointer text-blue-500 underline">{text}</Link></p>
        </div>
    )
}