// login

const getMoviesFromApi = (params) => {
  console.log(params.genre);
  return fetch(`//localhost:4000/movies?genre=${params.genre}&sort=${params.sort}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
