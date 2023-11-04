import axios from "axios";

const fetchData = async ({ url, method, data, token }: FetchDataType) => {
  const baseURL = `${import.meta.env.VITE_BASE_URL}${url}`; 
  console.log(url);
  const bearer = import.meta.env.VITE_BEARRER_TOKEN;
  axios.defaults.headers.common = { authorization: `${bearer}${token}` };
  const res = await axios({ baseURL, method, data });
  return res;
};
export default fetchData;
