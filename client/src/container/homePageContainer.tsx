import { HomeView } from "@/views/homeView";
import { useEffect, useState } from "react";

export type Property = {
  _id: string;
  name: string;
  location: string;
  price: number;
  url: string;
  description?: string;
  listedBy?: string;
  owner?: {
    email: string;
  };
};

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
