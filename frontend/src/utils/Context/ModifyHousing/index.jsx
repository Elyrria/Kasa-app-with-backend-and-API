import { useState, createContext } from "react"

export const SharedDataModifyHousingContext = createContext()

export const DataModifyHousingProvider = ({ children }) => {
    const [modifyMode, setModifyMode] = useState(false)
    const [toModify, setToModify] = useState(false)
    // const [dataHousingToModify, setDataHousingToModify] = useState([])

    return (
        <SharedDataModifyHousingContext.Provider
            value={{
                modifyMode,
                setModifyMode,
                toModify,
                setToModify,
            }}
        >
            {children}
        </SharedDataModifyHousingContext.Provider>
    )
}
