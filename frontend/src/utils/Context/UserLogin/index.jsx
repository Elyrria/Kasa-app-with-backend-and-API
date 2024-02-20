import { useState, createContext } from "react"

export const SharedDataLoginContext = createContext()

export const DataLoginProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false)
    const [dataLogin, setDataLogin] = useState(null)
    return (
        <SharedDataLoginContext.Provider
            value={{
                isLogin,
                setIsLogin,
                dataLogin,
                setDataLogin,
            }}
        >
            {children}
        </SharedDataLoginContext.Provider>
    )
}
