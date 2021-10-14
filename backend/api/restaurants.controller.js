import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsController {
    // Returns a list of all restaurants, default 20 per page
    static async apiGetRestaurants(req, res, next) {
        // set defaults
        const restaurantsPerPage = req.query.restaurantsPerPage ? 
            parseInt(req.query.restaurantsPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {}
        if (req.query.cuisine) {
            filters.cuisine = req.query.cuisine;
        } else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode 
        } else if (req.query.name) {
            filters.name = req.query.name
        }

        // returns restaurants and count
        const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
            filters, page, restaurantsPerPage
        })

        let response = {
            restaurants: restaurantsList,
            page: page, 
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalNumRestaurants,
        }
        res.json(response)
    }

    // Returns a restaurant by id
    static async apiGetRestaurantsById(req, res, next) {
        try {
            let id = req.params.id || {} // based on query
            let restaurant = await RestaurantsDAO.getRestaurantsByID(id);
            if (!restaurant) {
                res.status(404).json({ error: "Not found"});
            } 
            res.json(restaurant);
        } catch (e) {
            console.log(`api, ${e}`);
        }
    }


    // Returns a list of cuisines
    static async apiGetRestaurantCuisines(req, res, next) {
        try {
            let cuisines = await RestaurantsDAO.getCuisines();
            res.json(cuisines);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e})
        }
    }
}