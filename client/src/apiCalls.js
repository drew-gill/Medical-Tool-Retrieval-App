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

const readAllTools = async () => {
  const res = await axios.get(URL);
  console.log(res);
  return res.data || [];
};

const deleteTool = async id => {
  const res = await axios.delete(`${URL}?id=${id}`);
  console.log('Successful delete.');
};

const createTool = async (image, keywords) => {
  const res = await axios.post(URL, { file: image, keywords });
  console.log('Successful create.');
};

export { readAllTools, deleteTool, createTool };
