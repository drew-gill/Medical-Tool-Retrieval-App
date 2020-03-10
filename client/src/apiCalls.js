import axios from 'axios';

const devUrl = 'http://localhost:5000/api/';
const prodUrl = '';

const URL = devUrl;

// //todo: add db uri
// export default {
//   getData: async () => {
//     let res = await axios.get('http://localhost:5000/');
//     console.log(res);
//     return res.data || [];
//   }
// };

const fetchAllTools = async () => {
  const res = await axios.get(URL);
  return res.data || [];
};

export { fetchAllTools };
