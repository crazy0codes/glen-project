import { Dashboard } from "@/views/dashboardView";
import { useEffect, useState, type FormEvent } from "react";
import type { Property } from "./homePageContainer";
import axios from "axios";

interface Filter {
  price: number;
  location: string;
}

const URL = `http://localhost:3001/api/property/`;

export function AdminDashboard() {
  const user = "admin";
  const [filter, setFilter] = useState<Filter | null>(null);
  const [properties, setProperties] = useState<[Property] | null>(null);

  useEffect(() => {
    getAll();
  }, []);

  async function deleteHandler(e: FormEvent<HTMLFormElement>) {
    const res = await axios.delete(URL + propertyId);

    if (!(res.status == 200)) console.log(await res.data);

    const data = await res.data;
    console.log(data);
  }

  async function updateHandler(e: FormEvent<HTMLFormElement>) {
    const body = {
      email: "madhanpanja@gmail.com",
      id: "8iiusdu09202vlmsd92j",
    };
    const res = await axios.put(URL + propertyId);
    if (!(res.status === 200)) console.log(await res.data);

    const data = res.data;
    setProperties((prev) => {
      if (!prev) return prev;

      return prev.map((property) => {
        if (property._id === data._id) {
          return data;
        } else {
          return property;
        }
      }) as [Property];
    });
  }

  async function getAll() {
    // const res = await axios.get(URL);
    
    let res;
    if(user === "admin") res = await axios.get(URL);
    else res = await axios.get(URL+"")


    if (!(res.status == 200)) console.log(await res.data);

    setProperties(await res.data);
    console.log(await res.data);
  }

  async function getFiltered(filter) {
    const res = await axios.get(URL, {
      params: {
        filter,
      },
    });
  }

  return <Dashboard props={updateHandler, deleteHandler, properties, user} />;
}