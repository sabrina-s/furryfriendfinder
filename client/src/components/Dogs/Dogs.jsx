/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions
} from '@material-ui/core';
import { upperFirst } from 'lodash';
import fetchDogs from '../../data/dogs';
import { ADOPT_DOG_API } from '../../constants/api';
import { DUMMY_IMAGE } from '../../constants/paths';

function Dogs() {
  const [dogs, setDogs] = useState([]);

  async function getDogs() {
    const response = await fetchDogs();
    setDogs(response);
  }

  useEffect(() => {
    getDogs();
  }, []);

  function getImage(image) {
    if (!image) {
      return DUMMY_IMAGE;
    }

    return require(`../../assets/${image}`);
  }

  function handleAdopt(dogId) {
    const options = {
      method: 'PUT',
      body: JSON.stringify({ id: dogId }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    };

    return fetch(ADOPT_DOG_API + dogId, options)
      .then(() => {
        getDogs();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // eslint-disable-next-line arrow-body-style
  const adopted = (available) => {
    return available ? 'available' : 'adopted';
  };

  return (
    <div className='dogs-container'>
      {
        dogs.map((dog) => (
          <Card className={`card ${adopted(dog.available)}`} key={dog._id}>
            <CardMedia
              className='card-image'
              image={getImage(dog.image)}
              title={dog.name}
            />

            <CardContent className='card-content'>
              <h3>{dog.name}</h3>
              <div className='attributes'>
                <p>{upperFirst(dog.gender)}</p>
                { dog.hdbApproved && (
                  <p>HDB approved</p>
                )}
              </div>

              <p className='description'>{dog.description}</p>
            </CardContent>

            <CardActions className='card-actions'>
              <button
                type='button'
                className={`adopt ${adopted(dog.available)}`}
                onClick={() => handleAdopt(dog._id)}
              >
                Adopt
              </button>
            </CardActions>
          </Card>
        ))
      }
    </div>
  );
}

export default Dogs;
