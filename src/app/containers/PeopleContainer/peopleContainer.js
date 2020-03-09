import React, { useState, useEffect } from "react";
import CardComponent from "../../components/CardComponent/CardComponent";
import { getImage, getPeople } from "../../services/swapi";
import Button from "@material-ui/core/Button";
import Loader from "react-loader-spinner";

import "./PeopleContainer.scss";

const PeopleContainer = () => {
  const [people, setPeople] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [next, setNext] = useState('')
  const [prev, setPrev] = useState('')
  const [pageNum, setPageNum] = useState(1)
  const [prevPageNum, setPrevPageNum] = useState(1)

  const peopleList = async () => {
    const data = await getPeople();
    setPeople(data.results);
    setNext(data.next)
    setIsLoading(true);
    return data.results;
  };

  const nextPage = async (url) => {
    setPeople([{}]);
    setIsLoading(false);
    const toNext = await fetch(url);
    const data = await toNext.json();
    setPeople(data.results);
    setNext(data.next)
    setPrev(data.previous)
    setIsLoading(true);
    console.log('next people ', data);
    return data.results;
  };


  useEffect(()=> {
    console.log('useefect2')
    if(pageNum ==1) {
      peopleList();
    } else { 
      if (pageNum > prevPageNum) {
        nextPage(next)
      } else {
        nextPage(prev)
      }       
    }    
  }, [pageNum])

  return (
    <div className="ListWrapper">
      {console.log(people)}
      { people.map((person, idx) => {
        return isLoading ? (
          <CardComponent
            imgSrc={getImage(person.url.slice(-3,-1))}
            name={person.name}
            gender={person.gender}
            birth_year={person.birth_year}
            eye_color={person.eye_color}
            height={person.height}
            mass={person.mass}
            key={idx}
          />
        ) : (
          <Loader
            key={idx}
            type="Puff"
            color="#972426"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        );
      })}
      <div className="BtnWrapper">
        {console.log(pageNum)}
        <Button variant="contained" color="primary" 
        disabled={pageNum ==1 ? true :false}
        onClick={() => {
          setPrevPageNum(pageNum)
          setPageNum(pageNum-1)
          }}>
          Prev
        </Button>
        <Button variant="contained" color="primary" 
        onClick={() => {
          setPrevPageNum(pageNum)
          setPageNum(pageNum+1)          
          }}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PeopleContainer;
