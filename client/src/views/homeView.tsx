import PropertyCard from "@/components/propertyCard";
import { Link } from "react-router-dom";
import { type Property } from "@/container/homePageContainer";

interface HomeViewProps {
  properties: Property[] | null;
}

export function HomeView({ properties }: HomeViewProps) {
  console.log(properties);
  return (
    <>
      <h2 className="pl-10 pt-6 text-2xl font-medium tracking-tighter">
        Find the best deals
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {properties ? (
          properties.map((property) => (
            <Link to={`/listings/${property._id}`} key={property._id}>
              <PropertyCard {...property} />
            </Link>
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </>
  );
}
