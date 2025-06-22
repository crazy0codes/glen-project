import { Card, CardContent } from "@/components/ui/card";

interface Props {
  className?: string;
}

function PropertyCard({ className }: Props) {
  return (
    <Card className={`w-80 overflow-hidden pb-2 shadow-md ${className}`}>
      <img
        className="object-cover"
        src="https://wallpapercave.com/wp/wp3049325.jpg"
      />

      <CardContent className="pl-2 pb-1 pt-1 bg-white">
        <h3 className="text-lg text-left font-semibold">Apartment - Tanuku</h3>
        <p className="text-sm text-left  text-gray-700">
          2BHK, fully furnished
        </p>
      </CardContent>
    </Card>
  );
}

export default PropertyCard;
