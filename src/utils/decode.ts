import {jwtDecode} from "jwt-decode";

const decode = (token: string) => {
  try {
    const decoded: { _id: string } = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Token decoded failed:", error);
    return { _id: null }; // or throw an exception
  }
};

export default decode;