import React, { useState, useEffect } from "react";
import axios from "axios";
import { GET_ADOPTED_DOGS_API } from "../../constants/api";

const AdoptedDogs = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    axios
      .get(GET_ADOPTED_DOGS_API, { withCredentials: true })
      .then((res) => {
        setDogs(res.data);
      })
      .catch((error) => {
        console.error("adopteddogs---", error);
      });
  }, []);

  return (
    <div>
      <h3>Dogs you adopted</h3>
      {dogs.map((dog) => (
        <div key={dog._id}>{dog.name}</div>
      ))}
    </div>
  );
};

export default AdoptedDogs;
