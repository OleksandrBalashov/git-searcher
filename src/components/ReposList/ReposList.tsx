import './Repos.scss';

export interface IRepos {
  name: string;
  id: number;
  forks: number;
  stargazers_count: number;
  html_url: string;
}

interface IReposProps {
  repos: IRepos[];
}

const ReposList = ({ repos }: IReposProps) => {
  console.log(repos);
  return (
    <ul className="repos__list">
      {repos.length > 0 &&
        repos.map(({ name, forks, id, stargazers_count, html_url }) => (
          <li key={id} className="repos__list--item">
            <a
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="repos__item--link"
            >
              <h3 className="repos__item--title">{name}</h3>
              <div className="repos__item--wrap">
                <p className="repos__item--text">{forks} Forks</p>
                <p className="repos__item--text">{stargazers_count} Stars</p>
              </div>
            </a>
          </li>
        ))}
    </ul>
  );
};

export default ReposList;
