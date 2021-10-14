// Handles POST, PUT, DELETE reviews
import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    // Creates a new Review
    static async apiPostReview(req, res, next) {
        try {
            const restaurantId = req.body.restaurant_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }

            const date = new Date()
            const ReviewResponse = await ReviewsDAO.addReview(
                restaurantId, 
                userInfo,
                review,
                date
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    } 

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id
            const text = req.body.text
            const date = new Date()

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                text,
                date,
            )

            var { error } = reviewResponse
            if (error) {
                res.status(400).json({ error })
            }
            if (reviewResponse.modifiedCount === 0) {
                throw new Error("Unable to update review, user might not have permission to update, or review may not exist.")
            }
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.query.id
            const userId = req.body.user_id // do NOT do this in production, body should be empty
            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId
            )
            if (reviewResponse.deletedCount === 0) {
                throw new Error("Unable to delete review, check user id or review id.")
            } else {
                res.json({ status: "success" })
            }
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}