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
import { useState } from "react";

interface Props {
  user: "admin" | "user";
  properties: Property[] | null;
  deleteHandler: (id: string) => Promise<void>;
  updateHandler: (id: string, data: Partial<Property>) => Promise<void>;
}

export function Dashboard({
  updateHandler,
  deleteHandler,
  properties,
  user,
}: Props) {
  const [price, setPrice] = useState(0);
  return (
    <div className="m-6 p-4 min-h-[95vh]  border border-black border-2">
      <h2 className="p-0 m-0 text-6xl font-medium  tracking-[-4px]">
        {user === "admin" ? "Admin" : ""} Dashboard
      </h2>
      <Separator className="bg-black" />
      <div className="flex items-center my-2 ">
        <Input
          className="rounded-full mr-2 border border-1 border-gray-400 w-min"
          placeholder="Search"
        />
        {user === "admin" ? (
          <Button
            className="
          rounded-full
          cursor-pointer m-3"
          >
            All
          </Button>
        ) : (
          <>
            <Button className="rounded-full mr-2 cursor-pointer ">
              Reserved
            </Button>
            <Button className="rounded-full mr-2 cursor-pointer">Hosted</Button>
          </>
        )}

        {/* Filter */}
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
              max={9999}
              step={1}
              onValueCommit={(value) => setPrice(value[0])}
              className="w-full"
            />
            <Input placeholder="location" />
            <DialogFooter>
              <Button className="rounded-full  cursor-pointer">save</Button>
              <Button
                className="rounded-full cursor-pointer"
                variant={"destructive"}
              >
                clear
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-wrap gap-2">
        {properties?.map((property) => (
          <Dialog>
            <DialogTrigger>
              <PropertyCard {...property} />
            </DialogTrigger>
            <DialogContent>
              <form className="grid gap-2">
                <label htmlFor="name" className="font-medium">
                  Name
                </label>
                <Input name="Name" value={"Tanuku"} />
                <label htmlFor="location" className="font-medium">
                  Location
                </label>
                <Input name="location" value={"Tanuku"} />
                <label htmlFor="image" className="font-medium">
                  Images
                </label>
                <Input type="file" />
                <label typeof="price" className="font-medium">
                  Price
                </label>
                <Input type="text" placeholder="price"></Input>
              </form>
              <DialogFooter>
                <Button className="rounded-full cursor-pointer">save</Button>
                <Button
                  className="rounded-full cursor-pointer"
                  variant={"destructive"}
                >
                  discard
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
