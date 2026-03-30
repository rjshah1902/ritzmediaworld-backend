import express from "express";
const app = express();
import allRoutes from "./app/app.js";
import cors from "cors";


app.use(cors());
app.use(express.json());

app.use(allRoutes);

app.get("/", (req, res) => {
    res.send({
        "status": true,
        "message": "Backend Running Successfully",
        "data": [],
    });
});

app.listen(3000, (req, res) => {
    console.log("Project Running Successfully");
});