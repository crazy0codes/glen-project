import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import {
  Bed,
  CookingPot,
  Refrigerator,
  Smartphone,
  Tv2,
  WashingMachine,
  Wifi,
} from "lucide-react";

const propertyImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", // House exterior
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c", // Living room
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2", // Kitchen
];

export function PropertyDetailView() {
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6 m-16 px-6">
      <div className="grid grid-cols-1 auto-rows-auto gap-6">
        <div className="relative">
          <Carousel className="max-w-full">
            <CarouselContent>
              {propertyImages.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="sm:h-80 md:h-[28rem] flex items-center justify-center overflow-hidden rounded-xl shadow-md">
                    <img
                      src={img}
                      alt={`Property ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="h-10 w-10  translate-x-15" />
            <CarouselNext className="h-10 w-10 -translate-x-15" />
          </Carousel>
        </div>

        <div className="space-y-6">
          <Card className="mb-3">
            <CardContent className="p-3 flex items-center">
              <img
                className="object-cover rounded-full h-16 w-16"
                src="https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15891796/game-of-thrones-505-jon-snow_2100.0.0.1488830093.jpg?quality=90&strip=all&crop=0.071428571428569,0,99.857142857143,100"
              />
              <CardHeader className="ml-4">
                <CardTitle>
                  <h3 className="text-lg font-semibold">Hosted by Jon Snow</h3>
                  <small className="text-gray-500 font-normal">Live</small>
                </CardTitle>
              </CardHeader>
            </CardContent>
          </Card>

          <Card className="shadow-lg p-6">
            <CardTitle className="text-4xl mb-2">Apartment - Tanuku</CardTitle>
            <Separator />
            <CardDescription className="py-4">
              <p className="text-black text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                veritatis molestias, hic consectetur aspernatur adipisci? Dolore
                harum ut sunt et sit exercitationem a porro inventore. Fugit
                quibusdam eaque sit maxime.
              </p>
            </CardDescription>

            <CardContent className="m-0 p-0">
              <h3 className="font-medium text-2xl mb-2">
                What this place offers
              </h3>
              <Separator className="mb-6" />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Smartphone />, label: "Smartphone" },
                  { icon: <Bed />, label: "Bed" },
                  { icon: <Wifi />, label: "WiFi" },
                  { icon: <WashingMachine />, label: "Washing Machine" },
                  { icon: <Tv2 />, label: "TV" },
                  { icon: <CookingPot />, label: "Cooking Pot" },
                  { icon: <Refrigerator />, label: "Refrigerator" },
                ].map((item, idx) => (
                  <span className="flex items-center" key={idx}>
                    {item.icon}
                    <p className="ml-3">{item.label}</p>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="relative w-full flex flex-col">
        <Card className="p-6">
          <h3 className="text-2xl font-medium">Book the Dates</h3>
          <Separator className="mb-3" />
          <CardContent className="m-0 p-0">
            <Calendar
              mode="single"
              numberOfMonths={2}
              // classNames={{
              //   day : "p-2"
              // }}
              
              className="sticky w-full top-0 rounded-lg border bg-black text-white shadow-sm p-4"
            />
          </CardContent>
        </Card>
        <Card className="h-min mt-6 p-3">
          <CardTitle className="ml-5 p-2">
            <p>$223 for Night</p>
          </CardTitle>
          <CardContent>
            <table className="table-auto border bg-gray-200 rounded overflow-hidden w-full my-2">
              <tr>
                <td className="border-r border-gray-300 p-2 font-medium text-left">
                  <small className="block">check-in</small>
                  <small>03/11/2003</small>
                </td>
                <td className="p-2 font-medium text-left">
                  <small className="block">check-out</small>
                  <small>03/11/2003</small>
                </td>
              </tr>
            </table>
            <Button className="w-full cursor-pointer bg-orange-600 hover:bg-orange-500">
              Reserve
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
