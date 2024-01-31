// ! Hook pour la récupération des datas via la futur API avec gestion d'erreur //

import { useState, useEffect } from "react"

export function useFetch(url) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!url) return

        async function fetchData() {
            try {
                const response = await fetch(url)

                if (!response.ok) {
                    // Lance l'erreur
                    throw new Error(
                        `Réponse réseau incorrecte: ${response.status}`
                    )
                }

                const responseData = await response.json()

                setData(responseData) // Mise à jour du state data avec la fonction setData()
                // Récupère l'erreur
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des données :",
                    error.message
                )
                setError(error) // Mise à jour du state error avec la fonction setError()
            } finally {
                setLoading(false) // Mise à jour du state loading avec la fonction setLoading()
            }
        }

        fetchData()
    }, [url])

    return { data, loading, error }
}
