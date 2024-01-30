// ! Hook pour la récupération des datas via la futur API avec gestion d'erreur // 

// import { useEffect, useState } from "react"

// function useFetch(url) {
//     const [data, setData] = useState({})
//     const [isLoading, setLoading] = useState(true)
//     const [error, setError] = useState(false)

//     useEffect(() => {
//         if (!url) return
//         setLoading(true)
//         async function fetchData() {
//             try {
//                 const reponse = await fetch(url)
//                 const data = await reponse.json()
//                 setData(data)
//             } catch (err) {
//                 console.error(err)
//                 setError(true)
//             } finally {
//                 setLoading(false)
//             }
//         }
//         fetchData()
//     }, [url])

//     return { isLoading, data }
// }
