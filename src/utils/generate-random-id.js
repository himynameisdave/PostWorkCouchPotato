/**
 *     generateRandomId
 *
 *     @ids {arrayOf(Number)} - array of ids, ideally numbers
 *     return Number - new random number
 */
const generateRandomId = (ids) => {
  const num = Math.floor(Math.random() * 8999) + 1000;
  return ids && ids.length && ids.map(parseInt).includes(num)
        ? generateRandomId(ids)
        : num;
};

export default generateRandomId;
