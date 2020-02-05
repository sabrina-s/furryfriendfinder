import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 345,
    margin: 20
  },
  media: {
    height: 140,
  },
});

// TODO: add images for pet profiles, stored with mongoDB
const dogs = [
  { id: 1, name: "Bernie", gender: "male", yearOfBirth: "2018", description: "Friendly", hdbApproved: true, isAvailable: false },
  { id: 2, name: "Bob", gender: "male", yearOfBirth: "2019", description: "Shy", hdbApproved: false, isAvailable: true },
  { id: 3, name: "Bruno", gender: "male", yearOfBirth: "2016", description: "Energetic", hdbApproved: false, isAvailable: true },
  { id: 4, name: "Carla", gender: "female", yearOfBirth: "2020", description: "Sweet", hdbApproved: true, isAvailable: true },
  { id: 5, name: "Fred", gender: "male", yearOfBirth: "2017", description: "Loud", hdbApproved: false, isAvailable: true },
];

function Dogs() {
  const classes = useStyles();

  return (
    <div className="dog-cards">
      {
        dogs.map(dog => (
          <Card className={classes.root} key={dog.id}>
            <CardMedia
              className={classes.media}
              image="https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              title={dog.name}
            />
            <CardContent>
              <h3>{dog.name}</h3>
              { dog.hdbApproved &&
                <p>HDB approved</p>
              }
              <p>{dog.description}</p>
            </CardContent>
          </Card>
        ))
      }
    </div>
  )
};

export default Dogs;
