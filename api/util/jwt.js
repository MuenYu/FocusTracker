/**
 * jwt oepration util
 */
import jwt from "jsonwebtoken";

const options = {
  expiresIn: "30d", // Token will expire in 30 days
};

const secret = process.env.SECRET;

/**
 * generate jwt token based on the configured secret and data
 * @param {*} payload the data included in the jwt token
 * @returns
 */
export function GenJWT(payload) {
  return jwt.sign(payload, secret, options);
}

/**
 * check the signature of the token, and return the data object if the token is valid
 * @param {*} token the token needed to be decoded
 * @returns
 */
export function DecodeJWT(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("invalid token");
    return null;
  }
}
