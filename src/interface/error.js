import logs from './logs';
/**
 * Return an object with the error code and description,
 *
 * @param {STRING} info
 * @param {INT} code
 */
export default (info, code = 500) => {
  const res = {
    error: info,
    code
  };
  logs(res);

  return res;
};
