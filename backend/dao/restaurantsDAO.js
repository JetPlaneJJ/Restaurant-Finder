let restaurants // reference to specific DB
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

export default class RestaurantsDAO {
    // Retrieves reference to database
    static async injectDB(conn) {
        if (restaurants) { return; }
        try {
            restaurants = await conn.db(process.env.REST_DB_NAME).collection("restaurants")
        } catch (e) {
            console.error(`Unable to establish connection handle in rDAO: ${e}`)
        }
    }

    // Returns an object representing list of restaurants and the count
    static async getRestaurants({
        filters = null,
        page = 0, 
        restaurantsPerPage = 40,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                var exactName = '\"' + filters["name"] + '\"';
                exactName = exactName.trim();
                console.log("exactName="+exactName+"~");
                query = { $text: { $search: exactName } } 
            } else if ("cuisine" in filters) {
                // within cuisine, search for those equivalent
                query = { "cuisine": { $eq: filters["cuisine"]} }
            } else if ("zipcode" in filters) {
                query = {"address.zipcode": { $eq: filters["zipcode"]} }
            }
        }

        let cursor
        try {
            cursor = await restaurants.find(query)
        } catch (e) {
            console.error(`Unable to find command, ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }

        // skip to some page number of results
        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)
        try {
            const restaurantsList = await displayCursor.toArray()
            const totalNumRestaurants = await restaurants.countDocuments(query)
            return { restaurantsList, totalNumRestaurants }
        } catch (e) {
            console.error(`Unable to convert cursor to array of problem counting docs, ${e}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }
    }

    // Returns an object representing a list of restaurants given some unique ID
    // The restaurant reviews are ordered by most recent first.
    static async getRestaurantsByID(id) {
        try {
            const pipeline = [{ // matches different collections together
                $match: {
                    _id: new ObjectId(id), // restaurant, try to match specific ID
                },
            },
            {
                $lookup: {
                    from: "reviews", // tack on reviews with result
                    let: {
                        id: "$_id", // treat the _id of the review as "id"
                    },
                    pipeline: [
                        { // find all reviews that match the rest. id.
                            $match: { $expr: { $eq: ["$restaurant_id", "$$id"] } },
                        },
                        {
                            $sort: { date: -1 },
                        },
                    ],
                    as: "reviews",
                },
            },
            {
                $addFields: { // new field in results
                    reviews: "$reviews",
                },
            },
        ]
        return await restaurants.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Unable to retrieve restaurants and their reviews, ${e}`)
            throw e;
        }
    }

    // Returns an object representing a list of unique cuisines
    static async getCuisines() {
        let cuisines = []
        try {
            cuisines = await restaurants.distinct("cuisine")
            return cuisines
        } catch (e) {
            console.error(`Unable to get cuisines, ${e}`)
            return cuisines;
        }
    }
}
