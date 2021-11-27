import { NavLink } from 'react-router-dom';
import './UsersList.scss';

interface IUser {
  name: string;
  avatar_url: string;
  public_repos: number;
  login: string;
}

interface Props {
  user: IUser;
}

const UserList = ({ user }: Props) => {
  const { avatar_url, name, public_repos, login } = user;

  return (
    <NavLink
      to={{
        pathname: `/details/${login}`,
      }}
      className="userList__link"
    >
      <img src={avatar_url} alt={name} width="80" height="80" />
      <div className="userList__wrap">
        <p className="userList__name">{name}</p>
        <p className="userList__repo">Repo: {public_repos}</p>
      </div>
    </NavLink>
  );
};

export default UserList;
