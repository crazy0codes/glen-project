import { Dashboard } from "@/views/dashboardView";
import { useContext, useEffect, useState } from "react";
import type { Property } from "./homePageContainer";
import axios from "axios";
import { AuthContext } from "@/context/authContext";

const URL = `http://localhost:3001/api/property/`;

export function DashboardContainer() {
  const context = useContext(AuthContext);

  if (!context) {
    return null;
  }

  const { user, token } = context;

  const [properties, setProperties] = useState<Property[] | null>(null);

  useEffect(() => {
    if (user) {
      getAll();
    }
  }, [user, token]);

  async function deleteHandler(propertyId: string) {
    try {
      const res = await axios.delete(`${URL}listing`, {
        data: { propertyId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log(res.data);
        setProperties(
          (prev) => prev?.filter((prop) => prop._id !== propertyId) || null
        );
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  }

  async function updateHandler(
    propertyId: string,
    updatedData: Partial<Property>
  ) {
    try {
      const res = await axios.patch(`${URL}listing`, {
        propertyId,
        ...updatedData,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const data = res.data.property;
        setProperties((prev) => {
          if (!prev) return prev;

          return prev.map((property) => {
            if (property._id === data._id) {
              return data;
            } else {
              return property;
            }
          }) as Property[];
        });
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error updating property:", error);
    }
  }

  async function getAll() {
    let res;
    if (!user) return;

    if (user.role === "admin") {
      res = await axios.get(URL);
    } else {
      console.log("User ID:", user.id);
      res = await axios.get(`${URL}listedBy/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    if (!(res.status === 200)) {
      console.log(await res.data);
      return;
    }

    console.log("Response data:", res.data);
    setProperties(res.data);
  }

  async function getFiltered() {}

  async function getHostedProperties() {
    if (!user) return;
    const res = await axios.get(`${URL}listedBy/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!(res.status === 200)) console.log(await res.data);
    setProperties(res.data as Property[]);
  }

  return (
    <Dashboard
      properties={properties}
      getFiltered={getFiltered}
      deleteHandler={deleteHandler}
      updateHandler={updateHandler}
      user={user?.role}
      hosted={getHostedProperties}
      getAll={getAll}
    />
  );
}