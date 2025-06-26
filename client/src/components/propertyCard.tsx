import { Card, CardContent } from "@/components/ui/card";
import type { Property } from "@/container/homePageContainer";

interface Props extends Property {
  className?: string;
}

function PropertyCard({ className, _id, url, location, price }: Props) {
  return (
    <Card key={_id} className={`overflow-hidden pb-2 shadow-md ${className}`}>
      <img
        className="object-cover"
        src={url ? url : `https://wallpapercave.com/wp/wp3049325.jpg`}
      />

      <CardContent className="pl-2 pb-1 pt-1 bg-white">
        <h3 className="text-lg text-left font-semibold">{location}</h3>
        <p className="text-sm text-left  text-gray-700">{price}</p>
      </CardContent>
    </Card>
  );
}

export default PropertyCard;
