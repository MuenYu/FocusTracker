import jwt from "jsonwebtoken";

const options = {
  expiresIn: "30d", // Token will expire in 30 days
};

const secret = process.env.SECRET;

export function GenJWT(payload) {
  return jwt.sign(payload, secret, options);
}

export function DecodeJWT(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("invalid token");
    return null;
  }
}

