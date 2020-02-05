import React from 'react';
import { Card, CardMedia, CardContent } from '@material-ui/core';
import { upperFirst } from 'lodash';

// TODO: add images for pet profiles, stored with mongoDB
const dogs = [
  { id: 1, name: "Bernie", gender: "male", description: "Bernie is shy at first but quickly warms up to people. Once he is comfortable, he can be playful. He is extremely food-driven.", hdbApproved: true },
  { id: 2, name: "Horatio", gender: "male", description: "Horatio is a very sweet, gentle and lovable boy but needs time to warm up to his surroundings. He likes to be hugged at times but dislikes baths or having his nails clipped though he is fine to be cleaned with wet tissues. If he dislikes you touching certain areas, he will use his paws to push your hands away. A habit of his is to 'bite/nip' fingers as a form of playing. Horatio has always been in the company of other dogs so he might have some separation anxiety when left alone. On walks, Horatio will pull a little in the beginning but will settle into a rhythm though he can be wary and excitable in new surroundings so he will need some assurance. Horatio enjoys his food so do not leave any food unattended as he will steal it! Horatio is pee pad trained.", hdbApproved: false },
  { id: 3, name: "Raju", gender: "male", description: "Raju is an excited and chirpy boy who is always happy to see people. He is always up for a good head and belly scratch, and basks in the attention from the volunteers. His cheerful personality would be a great addition to any household. Raju does well on leash and has fun being outdoors.", hdbApproved: false },
  { id: 4, name: "Spangle", gender: "female", description: "Spangle has a very sweet and gentle disposition. Shy with strangers initially, she warms up fairly quickly and is affectionate once she knows you.", hdbApproved: true }
];

const dummyImagePath = "https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

function Dogs() {
  return (
    <div className="cards">
      {
        dogs.map(dog => (
          <Card className="card" key={dog.id}>
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
            </CardContent>
          </Card>
        ))
      }
    </div>
  )
};

export default Dogs;
