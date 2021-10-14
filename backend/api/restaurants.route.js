// Describes routing for the restaurants backend
import express from "express";
import RestaurantsCtrl from "./restaurants.controller.js";
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router();

// Restaurant info
router.route("/")
    .get(RestaurantsCtrl.apiGetRestaurants);
router.route("/id/:id") // obtain restaurants and their reviews by ID
    .get(RestaurantsCtrl.apiGetRestaurantsById);
router.route("/cuisines")
    .get(RestaurantsCtrl.apiGetRestaurantCuisines);

// Review info
router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview);

export default router;
