let toysCollection // reference to specific DB
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

//-------------------------------------------------------------------------------------------------
// Data Access Object for Toys Collection
export default class ToysDAO {
    // Retrieves reference to database
    static async injectDB(conn) {
        if (toysCollection) { return; }
        try {
            toysCollection = await 
                conn.db(process.env.INVENTORY_DB_NAME).collection(process.env.TOYS_COLLECTION_NAME)
        } catch (e) {
            console.error(`Unable to establish connection handle in toysDAO: ${e}`)
        }
    }

    // Returns an object representing list of all toys and their count
    static async getToys({
        filters = null,
        page = 0, 
        toysPerPage = 40,
    } = {}) {
        var pipeline = [
            {
              $match: {
                "name": { },
              },
            },
        ];

        let query
        if (filters) {
            if ("name" in filters) {
                var exactName = '\"' + filters["name"] + '\"';
                exactName = exactName.trim();
                console.log("exactName="+exactName+"~");
                query = { $text: { $search: exactName } } 
            }
        }

        let cursor
        try {
            cursor = await toysCollection.find(query)
        } catch (e) {
            console.error(`Unable to find command, ${e}`)
            return { toysList: [], totalNumToys: 0 }
        }

        // skip to some page number of results
        const displayCursor = cursor.limit(toysPerPage).skip(toysPerPage * page)
        try {
            const toysList = await displayCursor.toArray()
            const totalNumToys = await toysCollection.countDocuments(query)
            return { toysList: toysList, totalNumToys }
        } catch (e) {
            console.error(`Unable to convert cursor to array of problem counting docs, ${e}`)
            return { toysList: [], totalNumToys: 0 }
        }
    }

    // Returns an object representing a list of toys given some unique ID
    // TODO: The toys are ordered by review date. 
    static async getToysByID(id) {
        try {
            const pipeline = [{
                $match: {
                    _id: new ObjectId(id), 
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
                            $match: { $expr: { $eq: ["$toy_id", "$$id"] } },
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
        return await toysCollection.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Unable to retrieve toys and their reviews, ${e}`)
            throw e;
        }
    }
}
