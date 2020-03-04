import React, { useState, useEffect } from "react";
import CardComponent from "../../components/CardComponent/CardComponent";
import { getImage, getPeople } from "../../services/swapi";
import Button from "@material-ui/core/Button";

import "./PeopleContainer.scss";

const PeopleContainer = () => {
  const [people, setPeople] = useState([{}]);

  const peopleList = async () => {
    const data = await getPeople();
    console.log("arr", data);
    setPeople(data.results);
    return data.results;
  };

  useEffect(() => {
    peopleList();
  }, []);

  return (
    <div className="ListWrapper">
      {people.map((person, idx) => {
        return (
          <CardComponent
            imgSrc={getImage(idx + 1)}
            name={person.name}
            gender={person.gender}
            birth_year={person.birth_year}
            eye_color={person.eye_color}
            height={person.height}
            mass={person.mass}
            key={idx}
          />
        );
      })}
      <div className="BtnWrapper">
        <Button variant="contained" color="primary">
          Prev
        </Button>
        <Button variant="contained" color="primary">
          Next
        </Button>
      </div>
    </div>
  );
};

export default PeopleContainer;
