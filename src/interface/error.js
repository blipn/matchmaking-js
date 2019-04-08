/**
 * Return an object with the error code and description,
 *
 * @param {STRING} info
 * @param {INT} code
 */
export default (info, code = 500) =>
  ({
    error: info,
    code
  });

