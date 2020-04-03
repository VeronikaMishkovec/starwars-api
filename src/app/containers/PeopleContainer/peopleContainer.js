import React, { useState, useEffect } from "react";
import CardComponent from "../../components/CardComponent/CardComponent";
import { getImage } from "../../services/swapi";
import Button from "@material-ui/core/Button";
import Loader from "react-loader-spinner";
import { withRouter, Link } from "react-router-dom";

import "./PeopleContainer.scss";

const PeopleContainer = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");
  const [memoUrl, setMemoUrl] = useState();

  const session = sessionStorage.getItem("url")

  const peopleList = async url => {
    setIsLoading(true);
    const data = await (await fetch(url)).json();
    setPeople(data.results);
    setNext(data.next);
    setPrev(data.previous);
    console.log(memoUrl);
    setIsLoading(false);
    // setMemoUrl(url);
    // setMemoUrl(sessionStorage.getItem("url"));
    // console.log(memoUrl)
    // sessionStorage.setItem('url', url)
  };

  useEffect(() => {
    if (session) {
      peopleList(session);
    } else {
      peopleList("https://swapi.co/api/people");
    }
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="ListWrapper">
          {people.map((person, idx) => {
            return (
              <Link to={`/person/${person.url.match(/\/([0-9]*)\/$/)[1]}`}>
                <CardComponent
                  imgSrc={getImage(person.url.match(/\/([0-9]*)\/$/)[1])}
                  name={person.name}
                  gender={person.gender}
                  birth_year={person.birth_year}
                  eye_color={person.eye_color}
                  height={person.height}
                  mass={person.mass}
                  key={idx}
                />
              </Link>
            );
          })}
          <div className="BtnWrapper">
            <Button
              variant="contained"
              color="primary"
              disabled={!prev}
              onClick={() => {
                peopleList(prev);
                sessionStorage.setItem("url", prev);
              }}
            >
              Prev
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!next}
              onClick={() => {
                sessionStorage.setItem("url", next);
                peopleList(next);
              }}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <Loader
          className="spinner"
          type="ThreeDots"
          color="#972426"
          height={200}
          width={200}
        />
      )}
    </>
  );
};

export default withRouter(PeopleContainer);
