import React, { useState, useEffect } from "react";
import CardComponent from "../../components/CardComponent/CardComponent";
import { getImage } from "../../services/swapi";
import Button from "@material-ui/core/Button";
import Loader from "react-loader-spinner";

import "./PeopleContainer.scss";

const PeopleContainer = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");

  const peopleList = async url => {
    setIsLoading(true);
    const data = await (await fetch(url)).json();
    setPeople(data.results);
    setNext(data.next);
    setPrev(data.previous);
    setIsLoading(false);
  };

  useEffect(() => {
    peopleList("https://swapi.co/api/people");
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="ListWrapper">
          {people.map((person, idx) => {
            return (
              <CardComponent
                imgSrc={getImage(person.url.slice(-3, -1))}
                name={person.name}
                gender={person.gender}
                birth_year={person.birth_year}
                eye_color={person.eye_color}
                height={person.height}
                mass={person.mass}
                // key={idx}
              />
            );
          })}
          <div className="BtnWrapper">
            <Button
              variant="contained"
              color="primary"
              disabled={!prev}
              onClick={() => peopleList(prev)}
            >
              Prev
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!next}
              onClick={() => peopleList(next)}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <Loader
          // key={idx}
          className="spinner"
          type="ThreeDots"
          color="#972426"
          height={200}
          width={200}
          timeout={3000} //3 secs
        />
      )}
    </>
  );
};

export default PeopleContainer;
