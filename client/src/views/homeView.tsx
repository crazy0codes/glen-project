import PropertyCard from "@/components/propertyCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface Property {
  _id: string;
  url: string;
  price: string;
  location: string;
  bookedBy: string;
}

export function HomeView() {
  const [properties, setProperties] = useState<[Property] | null>(null);
  useEffect(() => {
    async function fetchData() {
      const properties = await fetch(
        "http://localhost:3001/api/property/properties"
      );
      const data = await properties.json();
      setProperties(data);
    }

    fetchData();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {properties ? (
          properties.map(
            ({...property}: Property) => (
              <Link to={`/details/${property._id}`}>
                <PropertyCard {...property} />
              </Link>
            )
          )
        ) : (
          <h2>Loading</h2>
        )}
      </div>
    </>
  );
}
