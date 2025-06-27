import PropertyCard from "@/components/propertyCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import type { Property } from "@/container/homePageContainer";
import { useState, useMemo, type FormEvent } from "react";

interface Props {
  user: string | undefined;
  properties: Property[] | null;
  deleteHandler: (id: string) => Promise<void>;
  updateHandler: (id: string, data: Partial<Property>) => Promise<void>;
  getAll?: () => Promise<void>;
  getFiltered: (filter?: { price?: number; location?: string }) => Promise<void>;
  hosted: () => Promise<void>;
}

export function Dashboard({
  updateHandler,
  deleteHandler,
  properties,
  user,
  getFiltered,
  hosted,
  getAll,
}: Props) {
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [currentProperty, setCurrentProperty] = useState<Property | null>(null);

  const handleUpdateFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentProperty) {
      const formData = new FormData(e.currentTarget);
      const updatedData: Partial<Property> = {
        name: formData.get("name")?.toString(),
        location: formData.get("location")?.toString(),
        price: parseFloat(formData.get("price")?.toString() || "0"),
      };
      await updateHandler(currentProperty._id, updatedData);
    }
  };

  const filteredProperties = useMemo(() => {
    if (!properties) return null;
    return properties.filter((property) => {
      const matchesLocation = location
        ? property.location.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesPrice = price > 0 ? property.price <= price : true;
      return matchesLocation && matchesPrice;
    });
  }, [properties, location, price]);

  return (
    <div className="m-6 p-4 min-h-[95vh] border border-black border-2">
      <h2 className="p-0 m-0 text-6xl font-medium tracking-[-4px]">
        {user === "admin" ? "Admin" : ""} Dashboard
      </h2>
      <Separator className="bg-black" />
      <div className="flex items-center my-2 ">
        <Input
          className="rounded-full mr-2 border border-1 border-gray-400 w-min"
          placeholder="Search"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
        {user === "admin" ? (
          <Button className="rounded-full cursor-pointer m-3" onClick={getAll}>
            All
          </Button>
        ) : (
          <>
            <Button
              className="rounded-full mr-2 cursor-pointer"
              onClick={hosted}
            >
              Hosted
            </Button>
          </>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full cursor-pointer text-white">
              Filter
            </Button>
          </DialogTrigger>

          <DialogContent>
            <p className="font-medium">Price: ₹{price}</p>
            <Slider
              defaultValue={[price]}
              max={999999}
              step={1}
              onValueCommit={(value) => setPrice(value[0])}
              className="w-full"
            />
            <Input
              placeholder="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <DialogFooter>
              <Button
                className="rounded-full cursor-pointer"
                onClick={() => getFiltered({ price, location })}
              >
                save
              </Button>
              <Button
                className="rounded-full cursor-pointer"
                variant={"destructive"}
                onClick={() => {
                  setPrice(0);
                  setLocation("");
                  getAll?.();
                }}
              >
                clear
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {filteredProperties?.map((property) => (
          <Dialog key={property._id}>
            <DialogTrigger onClick={() => setCurrentProperty(property)}>
              <PropertyCard {...property} />
            </DialogTrigger>
            <DialogContent>
              <form className="grid gap-2" onSubmit={handleUpdateFormSubmit}>
                <label htmlFor="name" className="font-medium">
                  Name
                </label>
                <Input name="name" defaultValue={currentProperty?.name} />
                <label htmlFor="location" className="font-medium">
                  Location
                </label>
                <Input
                  name="location"
                  defaultValue={currentProperty?.location}
                />
                <label htmlFor="image" className="font-medium">
                  Images
                </label>
                <Input type="file" name="image" />
                <label htmlFor="price" className="font-medium">
                  Price
                </label>
                <Input
                  type="number"
                  placeholder="price"
                  name="price"
                  defaultValue={currentProperty?.price}
                />
                <DialogFooter>
                  <Button type="submit" className="rounded-full cursor-pointer">
                    save
                  </Button>
                  <Button
                    type="button"
                    className="rounded-full cursor-pointer"
                    variant={"destructive"}
                    onClick={() => deleteHandler(property._id)}
                  >
                    delete
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}