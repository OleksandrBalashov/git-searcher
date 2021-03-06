import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Form from '../components/Form';
import ReposList from '../components/ReposList';
import { IRepos } from '../components/ReposList/ReposList';
import Spinner from '../components/Spinner';
import { getUser, getUserRepos } from '../services/services';
import createDateTime from '../utils/createDateTime';
import { createUserName } from '../utils/createUserName';
import './styles/Details.scss';

interface ILocation {
  name: string;
}

const initialState = {
  name: '',
  avatar_url: '',
  public_repos: 0,
  followers: 0,
  following: 0,
  bio: '',
  email: '',
  location: '',
  created_at: '',
  login: '',
};

const Details = () => {
  const getLocation = useLocation<ILocation>();
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(initialState);
  const [repos, setRepos] = useState<IRepos[]>([]);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('');

  const {
    avatar_url,
    name,
    email,
    location,
    created_at,
    followers,
    following,
    bio,
    login,
  } = user;

  const fetchUser = async (userName: string) => {
    const data = await getUser(userName);

    if (!data) return;

    return setUser(data);
  };

  const fetchUserRepos = async (userName: string) => {
    const repos = await getUserRepos(userName);

    if (!repos || repos.length === 0) {
      setError(true);
      return;
    }

    setRepos(repos);
  };

  const handleFilter = (value: string) => {
    const normalizedValue = value.toLocaleLowerCase();
    setError(false);

    setFilter(normalizedValue);
  };

  const filterRepos = useMemo(() => {
    const filterRep = repos.filter(({ name }) =>
      name.toLowerCase().includes(filter)
    );

    if (filter && filterRep.length === 0) {
      setError(true);
      return [];
    }

    return filterRep;
  }, [repos, filter]);

  useEffect(() => {
    if (userName) return;

    const name = createUserName(getLocation.pathname);

    setUserName(name);
  }, [getLocation, userName]);

  useEffect(() => {
    if (!userName) return;

    fetchUser(userName);
    fetchUserRepos(userName);
  }, [userName, getLocation]);

  if (name === '') {
    return <Spinner />;
  }

  return (
    <>
      {name !== '' && (
        <div className="details__container">
          <div className="details">
            <div className="details__wrapper">
              <img
                src={avatar_url}
                alt={name}
                width="300"
                height="300"
                className="detail__img"
              />
              <div className="details__wrapper--info">
                <h2 className="details__title">{login}</h2>
                <p className="details__text">
                  <span>Email: </span>
                  {email ? email : 'unknown'}
                </p>
                <p className="details__text">
                  <span>Location: </span>
                  {location}
                </p>
                <p className="details__text">
                  <span>Join Date: </span>
                  {createDateTime(created_at)}
                </p>
                <p>{followers} Followers</p>
                <p>Following {following}</p>
              </div>
            </div>
            <p className="details__bio">
              <span>About: </span>
              {bio ? bio : 'Unknown'}
            </p>
            <Form
              placeholderText="Search for User's Repositories"
              btnClear
              submitForm={handleFilter}
              changeHandler={handleFilter}
            />
            {error && (
              <h3 className="details__notFound">
                User's repositories not found
              </h3>
            )}
          </div>
          {filterRepos.length === 0 && !error && <Spinner />}
          {filterRepos.length > 0 && !error && (
            <ReposList repos={filterRepos} />
          )}
        </div>
      )}
    </>
  );
};

export default Details;
