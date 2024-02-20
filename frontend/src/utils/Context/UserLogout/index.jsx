import { useState, createContext } from "react"

export const SharedDataLogoutContext = createContext()

export const DataLogoutProvider = ({ children }) => {
    const [isLogout, setIsLogout] = useState(false)
    return (
        <SharedDataLogoutContext.Provider
            value={{
                isLogout,
                setIsLogout,
            }}
        >
            {children}
        </SharedDataLogoutContext.Provider>
    )
}

