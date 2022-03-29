import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: Number.MAX_SAFE_INTEGER });
export var baseUrl = 'http://localhost:5001/api/';
const Transport = {
  HTTP: {
    getAllNodes: () =>
      axios({
        url: baseUrl + `nodes`,
        method: 'GET',
      }),
    getNode: (id: Number) =>
      axios({
        url: baseUrl + `nodes/${id}`,
        method: 'GET',
      }),
  },
};
export default Transport;