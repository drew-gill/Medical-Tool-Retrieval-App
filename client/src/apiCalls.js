import axios from 'axios';

const devUrl = 'http://localhost:5000/api/';

const getUrl = () => {
  console.log(process.env);
  return process.env.API_URL || devUrl;
};

const readAllTools = async () => {
  const res = await axios.get(getUrl());
  return res.data || [];
};

const deleteTool = async id => {
  await axios.delete(`${getUrl()}?id=${id}`);
};

const createTool = async (image, keywords) => {
  let formData = new FormData();
  formData.append('image', image);
  formData.append('keywords', JSON.stringify(keywords));
  const res = await axios.post(getUrl(), formData);
  return res.data;
};

export { readAllTools, deleteTool, createTool };
