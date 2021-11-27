import { NavLink } from 'react-router-dom';
import './UsersList.scss';

interface IUser {
  name: string;
  avatar_url: string;
  public_repos: number;
  login: string;
  id: number;
}

interface Props {
  users: IUser[];
}

const UsersList = ({ users }: Props) => {
  return (
    <ul className="userList">
      {users.map(({ login, avatar_url, name, public_repos, id }) => (
        <li key={id}>
          <NavLink
            to={{
              pathname: `/details/${login}`,
            }}
            className="userList__link"
          >
            <img src={avatar_url} alt={login} width="80" height="80" />
            <div className="userList__wrap">
              <p className="userList__name">{login}</p>
              <p className="userList__repo">Repo: {public_repos}</p>
            </div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
