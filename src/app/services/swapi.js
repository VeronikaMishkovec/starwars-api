export const getPerson = async (item, id) => {
  const res = await fetch(`https://swapi.co/api/people/${id}`);
  return res.json().then(item);
};

export const getImage = (id) => {
  return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
}

export const getPeople = async () => {
  const res = await fetch(`https://swapi.co/api/people`);
  return await res.json();
};