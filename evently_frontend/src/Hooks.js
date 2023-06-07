import { useEffect, useState } from "react"

const useLocalStorage = () => {
    const [state, setState] = useState(() => {
        let val  = window.localStorage.getItem('token') || null
        return val;
    })

    useEffect(() => {
        window.localStorage.setItem("token", state)
    }, [state])

    return [state, setState] 
}

export {useLocalStorage}