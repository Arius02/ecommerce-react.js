import { jwtDecode } from "jwt-decode";
/**
 * Decodes a JWT token and returns the user information.
 * @param token - The JWT token to decode.
 * @returns The decoded user information as an AuthUserType.
 */
const decodeToken = (token: string): AuthUserType => {
  try {
    const decoded: AuthUserType = jwtDecode(token);
    return decoded;
  } catch (error) {
    return {
      _id: null,
      role: null
    };
  }
};

export default decodeToken;