import axios from "axios";
const getDataApi = (searchedWord) => {
  return axios.get(
    `http://api.giphy.com/v1/gifs/search?q=${searchedWord} &limit=4 &api_key=4L8vbrY0Yf0GpnXzHV6QNlMhdAfUAtg4`
  );
};
export default getDataApi
