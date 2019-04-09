import logs from './logs';
/**
 * Return an object with the success code,
 * description and data
 *
 * @param {STRING} info
 * @param {OBJ} data
 * @param {INT} code
 */
export default (info, data = {}, code = 200) => {
  const res = {
    info,
    code,
    data
  };
  logs(res);

  return res;
};

