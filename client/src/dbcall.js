import axios from 'axios';

//todo: add db uri
export default {
    getData: async () => {
        let res = await axios.get('http://localhost:5000/');
        console.log(res);
        return res.data || [];
    }
}