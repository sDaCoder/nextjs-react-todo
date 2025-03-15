import { TodoContext } from "@/Context/TodoContext"
import { useContext } from "react"

const Rendering = () => {
    
    const {ref} = useContext(TodoContext)

    return (
        <>
            <h1 className="inline absolute top-0 bg-white py-1 p-4 rounded">Rendered: {ref.current}</h1>
        </>
    )
}

export default Rendering
