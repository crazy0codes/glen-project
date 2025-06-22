import express, { Request, Response } from "express";
import { json } from "express";
import cors from "cors";
import routes from "./src/routes/indexRoutes"
import { initializeDB } from "./src/db/dbInit";


const app = express();

app.use(cors());
app.use(json());

initializeDB()

app.use("/api", routes);

app.get('/',(req:Request,res:Response) => { 
    res.json({name:"madhan"})
})

app.listen(3001, (error) => {
    if(error){
        console.error(error)
    }

    console.log("Server is running")
})
