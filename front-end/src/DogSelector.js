import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

function DogSelector() {
  const dogs = [
    { id: 1, name: "Bernie", age: "3", description: "Friendly", hdbApproved: true },
    { id: 2, name: "Bob", age: "5", description: "OK", hdbApproved: false }
  ];

  return (
    <div>
      <Autocomplete
        options={dogs}
        getOptionLabel={option => option.name}
        autoComplete={true}
        renderInput={params => {
          return (
            <TextField {...params}
              label="Search for doggo"
              variant="outlined"
              fullWidth
            />
          )
        }}
      />
    </div>
  )
};

export default DogSelector;
