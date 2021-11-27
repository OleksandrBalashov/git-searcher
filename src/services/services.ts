import axios from 'axios';
axios.defaults.baseURL = 'https://api.github.com';

axios.defaults.headers.common[
  'Authorization'
] = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

const getUser = async (userName: string) => {
  try {
    const { data } = await axios.get(`/users/${userName}`);

    return data;
  } catch (err) {
    console.log(err);
  }
};

const getUserRepos = async (userName: string) => {
  try {
    const { data } = await axios.get(`/users/${userName}/repos`);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export { getUser, getUserRepos };
