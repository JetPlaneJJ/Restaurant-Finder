import ToysDAO from "../dao/toysDAO.js";

//-------------------------------------------------------------------------------------------------
// Provides methods for interacting with the Toys DAO
export default class ToysController {
    // Returns a list of all toys, default 40 per page
    static async apiGetToys(req, res, next) {
        const toysPerPage = req.query.toysPerPage ? 
            parseInt(req.query.toysPerPage, 10) : 40;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {}
        if (req.query.manufacturer) {
            filters.manufacturer = req.query.manufacturer;
        } else if (req.query.switch_type) {
            filters.switch_type = req.query.switch_type 
        } else if (req.query.adaptation_difficulty) {
            filters.adaptation_difficulty = req.query.adaptation_difficulty
        } else if (req.query.name) {
            filters.name = req.query.name
        }

        // returns toys and count
        const { toysList, totalNumToys } = await ToysDAO.getToys({
            filters, page, toysPerPage: toysPerPage
        })

        let response = {
            toys: toysList,
            page: page, 
            filters: filters,
            entries_per_page: toysPerPage,
            total_results: totalNumToys,
        }
        res.json(response)
    }

    // Returns a toy by id
    static async apiGetToysById(req, res, next) {
        try {
            let id = req.params.id || {} // based on query
            let toy = await ToysDAO.getToysByID(id);
            if (!toy) {
                res.status(404).json({ error: "Not found"});
            } 
            res.json(restaurant);
        } catch (e) {
            console.log(`api, ${e}`);
        }
    }

    // Returns a list of cuisines
    // static async apiGetRestaurantCuisines(req, res, next) {
    //     try {
    //         let cuisines = await RestaurantsDAO.getCuisines();
    //         res.json(cuisines);
    //     } catch (e) {
    //         console.log(`api, ${e}`);
    //         res.status(500).json({ error: e})
    //     }
    // }
}