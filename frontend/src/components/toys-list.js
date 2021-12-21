//------------------------------------------------------------------------------------------
// Restaurants List displays restaurants by condition
import "../App.css";
import { useState, useEffect } from "react";
import ToyDataService from "../services/toy.js";

const ToysList = (props) => {
  const [toys, setToys] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveToys();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value; // take value of search box
    setSearchName(searchName);
  };

  const retrieveToys = () => {
    console.log("retrieving all toys");
    ToyDataService.getToys()
      .then((res) => {
        console.log(res.data);
        setToys(res.data.toys);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const find = (query, by) => {
    ToyDataService.findToy(query, by)
      .then((res) => {
        console.log(res.data);
        setToys(res.data.toys);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const findByName = () => {
    console.log("finding by name");
    find(searchName, "name");
  };

  const search = (
    <div className="input-section">
      <div className="input-group">
        <input
          type={"text"}
          className="form-control"
          placeholder="Toy Name"
          value={searchName}
          onChange={onChangeSearchName}
        />
        <div className="input-group-append">
          <button className="btn" type="button" onClick={findByName}>
            Search By Name
          </button>
        </div>
      </div>
    </div>
  );

  function ToysGrid() {
    if (toys) {
      console.log("toysList()");
      return toys.map((toy) => {
        return (
          <div key={toy._id} className="col-lg-4 pb-1">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{toy.name}</h2>
                <p className="card-text">
                  <strong>Available to Borrow: </strong>
                  {toy.count}
                  <br />
                  <strong>Difficulty: </strong>
                  {toy.adaptation_difficulty}
                  <br />
                  <strong>Output Type: </strong>
                  {toy.output}
                  <br />
                  <strong>Manufacturer: </strong>
                  {toy.manufacturer}
                </p>
                <a href={toy.purchase_link} className="btn">
                  Purchase Link
                </a>
              </div>
            </div>
          </div>
        );
      });
    }
    return null;
  }

  return (
    <div className="page">
      <h1>Toys Search</h1>
      {search}
      <div className="container">
        <ToysGrid />
      </div>
    </div>
  );
};

export default ToysList;
