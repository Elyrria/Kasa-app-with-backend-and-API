import { useState, useEffect, createContext } from "react"
import { useFetch } from "../../Hooks"
// Initialisation du contexte pour les datas
export const SharedDataContext = createContext()
// Initilisation du Provider
export const DataProvider = ({ children }) => {
    const [dataHousings, setDataHousings] = useState([])
    const { data, loading, error } = useFetch(
        `http://localhost:3001/api/housing`
    )

    //Récupération de la propriété  housings et stockage dans la variable fetchedHousings
    const { housings: fetchedHousings } = data

    useEffect(() => {
        // Si fetchedHousings existe alors :
        if (fetchedHousings) {
            setDataHousings(fetchedHousings) // Mise à jour du state dataHousings avec la fonction setDataHousings()
        }
    }, [fetchedHousings, setDataHousings])

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error loading data: {error.message}</div>
    }

    return (
        <SharedDataContext.Provider value={[dataHousings]}>
            {children}
        </SharedDataContext.Provider>
    )
}
