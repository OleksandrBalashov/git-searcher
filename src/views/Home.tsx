import { useEffect, useState } from 'react';
import Form from '../components/Form';
import UserList from '../components/UsersList/UsersList';
import { getUser } from '../services/services';
import './styles/Home.scss';

const initialState = {
  name: '',
  avatar_url: '',
  public_repos: 0,
  id: 0,
  login: '',
};

const Home = () => {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(initialState);
  const [error, setError] = useState(false);

  const submitForm = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    const valueFromStorage = sessionStorage.getItem('query');

    if (!valueFromStorage && !query) return;

    let timer: ReturnType<typeof setTimeout>;

    // find user in api
    const fetchUser = async (query: string | null) => {
      if (query === null) return;

      const data = await getUser(query);

      if (!data) {
        setError(true);
        setUser(initialState);

        // the timer works if user does't exist and remove "Not found" text
        timer = setTimeout(() => {
          setError(false);
        }, 1200);

        return;
      }

      setUser(data);
    };

    if (query) {
      fetchUser(query);
      sessionStorage.setItem('query', query);
      return;
    } else if (valueFromStorage) {
      fetchUser(valueFromStorage);
    }

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <h1 className="home__title">GitHub Searcher</h1>
      <Form placeholderText="Search for Users" submitForm={submitForm} />
      {error && <h1 className="notFound">Not found</h1>}
      {user.name && <UserList user={user} />}
    </div>
  );
};

export default Home;
