import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

const app = express();
const url = "/api/v1/restaurants";

app.use(cors()); // middleware
app.use(express.json()); // server parsing JSON

app.use(url, restaurants)
app.use("*", (req, res) => res.status(404).json({ // otherwise, show error
    error: "Not Found"
})); 

export default app;