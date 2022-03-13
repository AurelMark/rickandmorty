import axios from "axios";

export const charactersFilter = async (filter, page) => {
  const request = await axios({
    url: "https://rickandmortyapi.com/api/character",
    method: "get",
    params: {
      ...filter,
      page: page
    }
  }).then((response) => {
    return response.data;
  });

  return request;
};

export const characterSingle = async (id) => {
  const request = await axios({
    url: "https://rickandmortyapi.com/api/character/" + id,
    method: "get"
  }).then((response) => {
    return response.data;
  });

  return request;
};
