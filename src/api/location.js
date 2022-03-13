import axios from "axios";

export const getLocations = async (filter, page) => {
  const request = await axios({
    url: "https://rickandmortyapi.com/api/location",
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

export const locationSingle = async (id) => {
  const request = await axios({
    url: "https://rickandmortyapi.com/api/location/" + id,
    method: "get"
  }).then((response) => {
    return response.data;
  });

  return request;
};
