import React from 'react';
import {
  readAllTools,
  deleteTool,
  createTool,
  readTool,
  updateTool
} from '../apiCalls';

const ToolDataContext = React.createContext(null);

class ToolData {
  constructor() {
    this.data = [];
  }

  fetchAllTools = async () => {
    const res = await readAllTools();
    this.data = res;
  };

  fetchTool = async id => {
    const res = await readTool(id);
    return res;
  };

  createTool = async (image, keywords) => {
    const res = await createTool(image, keywords);
    this.data = [...this.data, res];
  };

  updateTool = async (image, keywords, id) => {
    const res = await updateTool(image, keywords, id);
    let newData = this.data;
    newData.forEach((d, index) => {
      if (d._id === id) {
        newData[index] = res;
      }
    });
    return res;
  };

  deleteTool = async id => {
    await deleteTool(id);
    const newData = [];
    this.data.forEach(d => {
      if (d._id !== id) {
        newData.push(d);
      }
    });
    this.data = newData;
  };
}

const withToolData = Component => props => (
  <ToolDataContext.Consumer>
    {toolData => <Component {...props} toolData={toolData} />}
  </ToolDataContext.Consumer>
);

export default ToolData;

export { ToolDataContext, withToolData };
