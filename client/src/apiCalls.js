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
  return res.data || [];
};

const deleteTool = async id => {
  await axios.delete(`${URL}?id=${id}`);
};

const createTool = async (image, keywords) => {
  let formData = new FormData();
  formData.append('image', image);
  formData.append('keywords', keywords);
  await axios.post(URL, formData);
};

export { readAllTools, deleteTool, createTool };
