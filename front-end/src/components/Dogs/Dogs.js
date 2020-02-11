import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent } from '@material-ui/core';
import { upperFirst } from 'lodash';

// TODO: add images for pet profiles, stored with mongoDB
const dummyImagePath = "https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

function Dogs() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    async function fetchDogs() {
      const response = await fetch("http://localhost:5000/dogs");
      const json = await response.json();
      setDogs(json);
    }
    fetchDogs();
  }, []);

  return (
    <div className="cards">
      {
        dogs.map(dog => (
          <Card className="card" key={dog._id}>
            <CardMedia
              className="card-image"
              image={dummyImagePath}
              title={dog.name}
            />
            <CardContent className="card-content">
              <h3>{dog.name}</h3>
              <div className="attributes">
                <p>{upperFirst(dog.gender)}</p>
                { dog.hdbApproved &&
                  <p>HDB approved</p>
                }
              </div>

              <p className="description">{dog.description}</p>
              <button role="adopt">Adopt</button>
            </CardContent>
          </Card>
        ))
      }
    </div>
  )
};

export default Dogs;
