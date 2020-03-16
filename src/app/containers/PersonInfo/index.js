import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import ItemInfo from "../../components/ItemInfo/ItemInfo";
import FilmItem from "../../components/FilmCard";

import "./PersonInfo.scss";

const PersonInfo = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [personImg, setPersonImg] = useState("");
  const [info, setInfo] = useState({});
  const [planet, setPlanet] = useState();
  const [planetImg, setPlanetImg] = useState();
  const [filmsList, setFilmsList] = useState([]);
  const [speciesList, setSpeciesList] = useState([]);
  const [vehiclesList, setVehiclesList] = useState([]);
  const [starshipsList, setStarshipsList] = useState([]);

  const getPerson = async id => {
    try {
      setIsLoading(true);
      const personImg = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
      const info = await (
        await fetch(`https://swapi.co/api/people/${id}`)
      ).json();
      const planet = await (
        await fetch(`https://swapi.co/api/planets/${id}`)
      ).json();
      const planetImg = `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
      setInfo(info);
      setPersonImg(personImg);
      setPlanet(planet);
      setPlanetImg(planetImg);
      setFilmsList(
        await Promise.all(await info.films.map(item => getFilms(item))).then(
          res => res
        )
      );
      setSpeciesList(
        await Promise.all(await info.species.map(item => getFilms(item))).then(
          res => res
        )
      );
      setVehiclesList(
        await Promise.all(await info.vehicles.map(item => getFilms(item))).then(
          res => res
        )
      );
      setStarshipsList(
        await Promise.all(await info.starships.map(item => getFilms(item))).then(
          res => res
        )
      );
    } catch (e) {
      console.log("error", e);
    } finally {
      setIsLoading(false);
    }
  };

  const getFilms = async url => {
    return await (await fetch(url)).json();
  };

  useEffect(() => {
    getPerson(id);
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="InfoWrapper">
          <div className="person">
            <img src={personImg} />
            <ItemInfo head="Name" parametr={info.name} />
            <ItemInfo head="Height" parametr={info.height} />
            <ItemInfo head="Mass" parametr={info.mass} />
            <ItemInfo head="Hair color" parametr={info.hair_color} />
            <ItemInfo head="Skin color" parametr={info.skin_color} />
            <ItemInfo head="Eye color" parametr={info.eye_color} />
            <ItemInfo head="Birth year" parametr={info.birth_year} />
            <ItemInfo head="Gender" parametr={info.gender} />
          </div>
          <div className="homeworld">
            <div className="Head">Homeworld</div>
            <img className="planetImg" src={planetImg} />
            <ItemInfo head="Name" parametr={planet.name} />
            <ItemInfo
              head="Rotation period"
              parametr={planet.rotation_period}
            />
            <ItemInfo head="Diameter" parametr={planet.diameter} />
            <ItemInfo head="Climate" parametr={planet.climate} />
            <ItemInfo head="Population" parametr={planet.population} />
          </div>
          <div className="films">
            <div className="Head">Films</div>
            <div className="filmsWrapper">
              {filmsList.map(item => (
                <FilmItem filmName={item.title} />
              ))}
            </div>
          </div>
          <div className="Species">
            <div className="Head">Species</div>
            <div className="speciesWrapper">
              {speciesList.map(item => (
                <FilmItem filmName={item.name} />
              ))}
            </div>
          </div>
          <div className="Vehicles">
            <div className="Head">Vehicles</div>
            <div className="vehiclesWrapper">
              {vehiclesList.map(item => (
                <FilmItem
                  filmName={item.name}
                />
              ))}
            </div>
          </div>
          <div className="Starships">
            <div className="Head">Starships</div>
            <div className="starshipsWrapper">
              {starshipsList.map(item => (
                <FilmItem
                  filmName={item.name}
                />
              ))}
            </div>
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

export default PersonInfo;
