//------------------------------------------------------------------------------------------
// Restaurants List displays restaurants by condition
import "../App.css";
import { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant.js";
import { Link } from "react-router-dom";

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]); // default: show all

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value; // take value of search box
    setSearchName(searchName);
  };
  const onChangeSearchZip = (e) => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };
  const onChangeSearchCuisine = (e) => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
  };

  const retrieveRestaurants = () => {
    console.log("retrieving all restaurants");
    RestaurantDataService.getAll()
      .then((res) => {
        console.log(res.data);
        setRestaurants(res.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then((res) => {
        console.log(res.data);
        setCuisines(["All Cuisines"].concat(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    console.log("refresh");
    retrieveRestaurants();
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then((res) => {
        console.log(res.data);
        setRestaurants(res.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const findByName = () => {
    console.log("finding by name");
    find(searchName, 'name');
  };
  const findByZip = () => {
    console.log("finding by zip");
    find(searchZip, 'zipcode');
  };
  const findByCuisine = () => {
    console.log("finding by cuisine");
    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, 'cuisine');
    }
  };

  return (
    <div className="RestaurantsList">
      This is RestaurantsList section.
      <div className="input-group">
        <input
          type={"text"}
          className="form-control"
          placeholder="Restaurant Name"
          value={searchName}
          onChange={onChangeSearchName}
        />
        <div className="input-group-append">
          <button className="btn" type="button" onClick={findByName}>
            Search By Name
          </button>
        </div>
      </div>
      <div className="input-group">
        <input
          type={"text"}
          className="form-control"
          placeholder="Zip Code"
          value={searchZip}
          onChange={onChangeSearchZip}
        />
        <div className="input-group-append">
          <button className="btn" type="button" onClick={findByZip}>
            Search By Zip
          </button>
        </div>
      </div>
      <div className="input-group">
        <select onChange={onChangeSearchCuisine}>
          {cuisines.map((cuisine) => {
            return (
              <option key={cuisine} value={cuisine}>
                {cuisine.slice(0, 20)}
              </option>
            );
          })}
        </select>
        <div className="input-group-append">
          <button className="btn" type="button" onClick={findByCuisine}>
            Search By Cuisine
          </button>
        </div>
      </div>
      <div className="row">
        {restaurants.map((restaurant) => {
          const readableAddress = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div
              key={restaurant + ":" + readableAddress}
              className="col-lg-4 pb-1"
            >
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">{restaurant.name}</h2>
                  <p className="card-text">
                    <strong>Cuisine:</strong>
                    {restaurant.cuisine}
                    <br />
                    <strong>Address: </strong>
                    {readableAddress}
                    <br />
                  </p>
                  <div className="row">
                    <Link to={"/restaurants/" + restaurant._id} className="btn">
                      View Reviews
                    </Link>
                    <a
                      rel="noreferrer"
                      target={"_blank"}
                      href={
                        "https://www.google.com/maps/place/" + readableAddress
                      }
                      className="btn"
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsList;
