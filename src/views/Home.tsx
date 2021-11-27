import { useEffect, useState } from 'react';
import Form from '../components/Form';
import UsersList from '../components/UsersList/UsersList';
import { getUsers } from '../services/services';
import './styles/Home.scss';

const Home = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
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

      const data = await getUsers(query);

      if (!data) {
        setError(true);
        setUsers([]);

        // the timer works if user does't exist and remove "Not found" text
        timer = setTimeout(() => {
          setError(false);
        }, 1200);

        return;
      }

      setUsers(data);
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
      {users.length > 0 && <UsersList users={users} />}
    </div>
  );
};

export default Home;
