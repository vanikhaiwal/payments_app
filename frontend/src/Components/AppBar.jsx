import Heading from "./heading"

export default function AppBar(){
    return(
        <div>
            <div className=" flex justify-between  p-4">
                <Heading label={"Payment App"}/>
                <h1 className="text-black text-base text-center m-3 font-semibold">Hello user!</h1>
            </div>
        </div>
    )
}