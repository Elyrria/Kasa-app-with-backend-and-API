import { useState, createContext } from "react"

export const SharedActiveToastBar = createContext()

export const DataActiveToastBar = ({ children }) => {
    const [isActiveToastBar, setIsActiveToastBar] = useState(false)
    const [messageToastBar, setMessageToastBar] = useState("")

    return (
        <SharedActiveToastBar.Provider
            value={{
                isActiveToastBar,
                setIsActiveToastBar,
                messageToastBar,
                setMessageToastBar,
            }}
        >
            {children}
        </SharedActiveToastBar.Provider>
    )
}
