/**
 * jwt oepration util
 */
import jwt from "jsonwebtoken";

const secret = process.env.TOKEN_SECRET;
const expiration = process.env.TOKEN_EXPIRATION

const options = {
  expiresIn: expiration, // Token will expire in 30 days
};


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
    return error;
  }
}
