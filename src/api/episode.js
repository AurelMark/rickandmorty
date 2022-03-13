import axios from "axios";

export const getEpisodes = async (filter, page) => {
  const request = await axios({
    url: "https://rickandmortyapi.com/api/episode",
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

export const episodeSingle = async (id) => {
  const request = await axios({
    url: "https://rickandmortyapi.com/api/episode/" + id,
    method: "get"
  }).then((response) => {
    return response.data;
  });

  return request;
};
