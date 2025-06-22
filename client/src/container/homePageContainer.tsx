import { useEffect, useState } from "react"


async function fetchProperties() {
    
   const fetched = await fetch(`http://localhost:3001/properties`)
   const data = await fetched.json();
   
   return data;
}


export function HomePageContainer(){
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        fetchProperties().then(data => {
            setProperties(data);
        })
    }, [])

    return (
        <>
        </>
    )
}