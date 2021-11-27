import axios from 'axios';
axios.defaults.baseURL = 'https://api.github.com';

axios.defaults.headers.common[
  'Authorization'
] = `Bearer ${process.env.REACT_APP_API_TOKEN}`;

const getUsers = async (userName: string) => {
  try {
    const {
      data: { items },
    } = await axios.get(`/search/users`, {
      params: {
        q: userName,
      },
    });

    return items;
  } catch (err) {
    console.log(err);
  }
};

const getUserRepos = async (userName: string) => {
  try {
    const {
      data: { items },
    } = await axios.get(`/search/repositories`, {
      params: {
        q: userName,
      },
    });

    return items;
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (userName: string) => {
  try {
    const { data } = await axios.get(`/users/${userName}`);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export { getUsers, getUserRepos, getUser };
