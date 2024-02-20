import axios from "axios"
import { useState, useEffect } from "react"

export function useDatas() {
    const [housingsData, setHousingsData] = useState()
    const [loadingHousingsData, setLoadingHousingsData] = useState(true)

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/housing")
            .then((res) => {
                setHousingsData(res.data.housings)
                setLoadingHousingsData(false)
            })
            .catch((error) => {
                console.error(error)
                setLoadingHousingsData(false)
            })
    }, [])

    return { housingsData, loadingHousingsData }
}
