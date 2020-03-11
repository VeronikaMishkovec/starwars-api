export const getPerson = async (item, id) => {
  const res = await fetch(`https://swapi.co/api/people/${id}`);
  return res.json().then(item);
};

export const getImage = id => {
  return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
};

export const getPeople = async (url) => {
  const res = await fetch(url);
  return await res.json();
};
