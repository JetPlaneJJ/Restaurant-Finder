import { useState, useEffect } from 'react';
import RestaurantDataService from "../services/restaurant.js";
import { Link } from 'react-router-dom';
import '../App.css'; 

// Represents a single restaurant's data including reviews
function Restaurant(props) {
  const defaultRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  };

  useEffect(() => {
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  const [restaurant, setRestaurant] = useState(defaultRestaurantState);

  // Retrieves a list of restaurants
  const getRestaurant = id => {
    RestaurantDataService.get(id)
      .then(res => {
        setRestaurant(res.data);
        console.log(res.data);
      })
      .catch(e => console.log(e))
  }

  // Deletes a review and Replaces restaurant review list without
  // the deleted review. Takes in a review's unique ID (int)
  // and its index within the review array.
  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId)
      .then(res => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1)
          return ({
            ...prevState
          });
        })
      })
      .catch(e => console.log(e))
  }

  return (
    <div className='Restaurant'>
        This is Restaurants section.
        {restaurant ? (
          <div>
            <h5>{restaurant.name}</h5>
            <p>
              <strong>Cuisine:</strong>{restaurant.cuisine}<br/>
              <strong>Address:</strong>{`${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`}<br/>
            </p>
            <Link 
              to={{ pathname: "/restaurants/" + props.match.params.id + "/review", 
                state: {restaurant: restaurant.name, id: props.match.params.id}}}
              className='btn'
            >
              Add Review
            </Link>

            <h4> Reviews </h4>
            <div className='row'>
              {restaurant.reviews.length > 0 ? (
                restaurant.reviews.map((review, index) => {
                  return (
                    <div className='col-lg-4' key={index}>
                      <div className="card">
                        <div className='card-body'>
                          <p className='card-text'>
                            {review.text}<br/>
                            <strong>User: </strong>{review.name}<br/>
                            <strong>Date: </strong>{review.date}<br/>
                          </p>
                          { (props.user && props.user.id === review.user_id) && 
                            <div className='row'>
                              <a  onClick={() => deleteReview(review._id, index)} className='btn'>
                                Delete Review
                              </a>
                              <Link to={{
                                pathname: "/restaurants/" + props.match.params.id + "/review",
                                state: {
                                  currentReview: review
                                }
                              }}>
                                Edit Review
                              </Link>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : <div>
                No Reviews yet.
                </div>
                }
            </div>

          </div>
        ) : <div></div>}
    </div>
  );
}

export default Restaurant;