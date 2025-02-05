import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Fetches data from a specified URL using axios.
 *
 * @param params - Configuration object for the request.
 * @param params.url - The endpoint URL to fetch data from.
 * @param params.method - HTTP method to use (e.g., 'GET', 'POST').
 * @param params.data - Data to send with the request (for methods like 'POST').
 * @param params.token - Optional token for authorization.
 *
 * @returns A promise that resolves to the axios response.
 * @throws Will throw an error if the request fails
 */
const fetchData = async ({
  url,
  method,
  data,
  token,
}: {
  url: string;
  method: string;
  data?: any;
  token?: string;
}): Promise<AxiosResponse> => {
  const baseURL = `${import.meta.env.VITE_BASE_URL}${url}`;
  const bearerToken = import.meta.env.VITE_BEARRER_TOKEN;

  axios.defaults.headers.common = { authorization: `${bearerToken}${token}` };

  // Define the configuration for the axios request
  const config: AxiosRequestConfig = {
    baseURL,
    method,
    data,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
};

export default fetchData;
