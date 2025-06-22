import PropertyCard from "@/components/propertyCard";
import { Link } from "react-router-dom";

export function HomeView() {
  return (
    <>
      <div className="flex gap-2 flex-wrap p-7 md:flex-auto">
        {[1, 2, 3, 4, 5, 6, 7].map((ele) => {
          return (
            <Link to={"/details"}>
              <PropertyCard />
            </Link>
          );
        })}
      </div>
    </>
  );
}
