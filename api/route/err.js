// customized error, used to simplify the logic
export default class CustomError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}
