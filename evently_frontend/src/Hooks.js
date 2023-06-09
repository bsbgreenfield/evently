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
const useToggle = () => {
    const [state, setState] = useState(false)

    const toggle = () => setState(!state)
    return [state, toggle]
}
export {useLocalStorage, useToggle}