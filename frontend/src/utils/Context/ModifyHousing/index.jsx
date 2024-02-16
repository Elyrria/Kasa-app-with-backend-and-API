import { useState, createContext } from "react"

export const SharedDataModifyHousingContext = createContext()

export const DataModifyHousingProvider = ({ children }) => {
    const [modifyMode, setModifyMode] = useState(false)
    const [isModify, setIsModify] = useState(false)
    const [dataHousingToModify, setDataHousingToModify] = useState([])

    return (
        <SharedDataModifyHousingContext.Provider
            value={{
                modifyMode,
                setModifyMode,
                isModify,
                setIsModify,
                dataHousingToModify,
                setDataHousingToModify,
            }}
        >
            {children}
        </SharedDataModifyHousingContext.Provider>
    )
}
