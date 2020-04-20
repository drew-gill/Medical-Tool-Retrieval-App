import axios from 'axios';

const devUrl = require('../config').devUrl;
const prodUrl = require('../config').prodUrl;

//use for tool CRUD
const getUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return prodUrl + 'api/';
  } else {
    return devUrl + 'api/';
  }
};

//use for user CRUD
const getUrlUser = () => {
  if (process.env.NODE_ENV === 'production') {
    return prodUrl + 'user/api/';
  } else {
    return devUrl + 'user/api/';
  }
};

const getUrlRegister = () => {
  if (process.env.NODE_ENV === 'production') {
    return prodUrl + 'register/api/';
  } else {
    return devUrl + 'register/api/';
  }
};

const readAllTools = async () => {
  const res = await axios.get(getUrl());
  const { data } = res;
  return data || [];
};

const deleteTool = async (id) => {
  await axios.delete(`${getUrl()}?id=${id}`);
};

const createTool = async (image, keywords) => {
  let formData = new FormData();
  formData.append('image', image);
  formData.append('keywords', JSON.stringify(keywords));
  const res = await axios.post(getUrl(), formData);
  const { data } = res;
  const tool = await readTool(data._id);
  return tool;
};

const updateTool = async (image, keywords, id) => {
  let formData = new FormData();
  if (image) {
    formData.append('image', image);
  }
  formData.append('keywords', JSON.stringify(keywords));
  const res = await axios.put(`${getUrl()}?id=${id}`, formData);
  const { data } = res;
  const tool = await readTool(data._id);
  return tool;
};

const readTool = async (id) => {
  const res = await axios.get(`${getUrl()}?id=${id}`);
  return res.data;
};

const addToolRetrieval = async (retrievalTime, id) => {
  const payload = { retrievalTime };
  const res = await axios.post(`${getUrl()}retrievals/?id=${id}`, payload);
  const { data } = res;
  const tool = await readTool(data._id);
  return tool;
};

const updateToolRetrieval = async (
  retrievalId,
  retrievalTime,
  retrievalDate,
  id
) => {
  let formData = new FormData();

  if (retrievalId) {
    formData.append('retrievalId', retrievalId);
  }
  if (retrievalTime) {
    formData.append('retrievalTime', retrievalTime);
  }
  if (retrievalDate) {
    formData.append('retrievalDate', retrievalDate);
  }
  const res = await axios.put(`${getUrl()}?id=${id}/retrievals`, formData);
  const { data } = res;
  const tool = await readTool(data._id);
  return tool;
};

const removeToolRetrieval = async (retrievalId, id) => {
  let formData = new FormData();

  if (retrievalId) {
    formData.append('retrievalId', retrievalId);
  }
  const res = await axios.delete(`${getUrl()}?id=${id}/retrievals`, formData);
  const { data } = res;
  const tool = await readTool(data._id);
  return tool;
};

//this might work? not sure
//I havent tested this functionality at all, this was a branch merged into mine from drews - willy
// this now works - Zach
const createUser = async (username, password) => {
  const payload = {
    username,
    password,
  };
  try {
    const res = await axios.post(getUrlRegister(), payload);
    const { data } = res;
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const updateUser = async (id, username = undefined, password = undefined) => {
  const payload = {
    username,
    password,
  };

  try {
    await axios.put(`${getUrlUser()}?id=${id}`, payload);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const getUser = async (id) => {
  try {
    const { data } = await axios.get(`${getUrlUser()}?id=${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const getAllUsers = async () => {
  try {
    const { data } = await axios.get(getUrlUser());
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const verifyLogin = async (username, password) => {
  const payload = {
    username,
    password,
  };

  try {
    const { data } = await axios.post(getUrlUser(), payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const deleteUser = async (id) => {
  try {
    await axios.delete(`${getUrlUser()}?id=${id}`);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export {
  readAllTools,
  deleteTool,
  createTool,
  readTool,
  updateTool,
  addToolRetrieval,
  updateToolRetrieval,
  removeToolRetrieval,
  verifyLogin,
  updateUser,
  getUser,
  getAllUsers,
  createUser,
  deleteUser,
};
