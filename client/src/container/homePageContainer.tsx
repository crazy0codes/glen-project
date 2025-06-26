import { HomeView } from "@/views/homeView";
import { useEffect, useState } from "react";

export interface Property {
  _id: string;
  url: string;
  price: string;
  location: string;
  bookedBy: string;
  description: string;
  owner: {
    email:string,
    _id: string
  }
}

export function HomePageContainer() {
  const [properties, setProperties] = useState<Property[] | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      const fetched = await fetch(`http://localhost:3001/api/property/`);
      const data: Property[] = await fetched.json();
      setProperties(data);
    }

    fetchProperties();
  }, []);

  return (
    <>
      <HomeView properties={properties} />
    </>
  );
}
