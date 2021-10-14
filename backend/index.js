import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000

console.log("Waiting to start server...")
MongoClient.connect(
    process.env.MONGODB_ATLAS_URI,
    {
        wtimeoutMS: 2500,
    }
).catch(err => {
    console.log(err);
    process.exit(1);
}).then(async client => {
    await RestaurantsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => { // start server
        console.log(`Live on port ${port}`)
    })
})