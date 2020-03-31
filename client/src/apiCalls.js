import axios from 'axios';

const devUrl = 'http://localhost:5000/';
const prodUrl = 'https://cen3031-final-project.herokuapp.com/';

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
}

const readAllTools = async () => {
  const res = await axios.get(getUrl());
  const { data } = res;
  return data || [];
};

const deleteTool = async id => {
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

const readTool = async id => {
  const res = await axios.get(`${getUrl()}?id=${id}`);
  return res.data;
};


const addToolRetrieval = async (retrievalTime, retrievalDate, id) => {
  let formData = new FormData();
  if (retrievalTime) {
    formData.append('retrievalTime', retrievalTime);
  }
  if(retrievalDate){
    formData.append('retrievalDate', retrievalDate);
  }
  const res = await axios.post(`${getUrl()}?id=${id}/retrievals`, formData);
  const { data } = res;
  const tool = await readTool(data._id);
  return tool;
};

const updateToolRetrieval = async (retrievalId, retrievalTime, retrievalDate, id) => {
  let formData = new FormData();

  if(retrievalId){
    formData.append('retrievalId', retrievalId);
  }
  if (retrievalTime) {
    formData.append('retrievalTime', retrievalTime);
  }
  if(retrievalDate){
    formData.append('retrievalDate', retrievalDate);
  }
  const res = await axios.put(`${getUrl()}?id=${id}/retrievals`, formData);
  const { data } = res;
  const tool = await readTool(data._id);
  return tool;
};

const removeToolRetrieval = async (retrievalId, id) => {
  let formData = new FormData();

  if(retrievalId){
    formData.append('retrievalId', retrievalId);
  }
  const res = await axios.delete(`${getUrl()}?id=${id}/retrievals`, formData);
  const { data } = res;
  const tool = await readTool(data._id);
  return tool;
};

//this might work? not sure
//I havent tested this functionality at all, this was a branch merged into mine from drews - willy
const createUser = async(username, password) => {
  let formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  const res = await axios.post(getUrlUser(), formData);
  const { data } = res;
  const user = await readTool(data._id); //change this for user data**************
  return user;
}

const VerifyLogin = async (username, password) => {
  const data = {
    username: username,
    password: password
  }

  try {
    const res = await axios.post(getUrlUser(), data);
    if (res.status === 200) {
      return true;
    }
    else {
      return false;
    }
  }
  catch (e) {
    console.error(e);
  }
  return false;
}

export { readAllTools, deleteTool, createTool, readTool, updateTool, addToolRetrieval, updateToolRetrieval, removeToolRetrieval, VerifyLogin };