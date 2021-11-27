import { useState } from 'react';
import './styles/Form.scss';

interface Props {
  placeholderText: string;
  btnClear?: boolean;
  submitForm: (value: string) => void;
  changeHandler?: (value: string) => void;
}

const Form = ({
  placeholderText,
  btnClear,
  submitForm,
  changeHandler,
}: Props) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitForm(query);
    setQuery('');
  };

  // for filter reposList
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setQuery(value);

    if (changeHandler) {
      changeHandler(value);
      return;
    }
  };

  // for clear button to remove input value
  const handleClick = () => {
    if (changeHandler) {
      setQuery('');
      changeHandler('');
      return;
    }
  };

  return (
    <>
      {btnClear && (
        <div className="clearWrap">
          <span>Filter:</span>
          <button type="button" className="btnClear" onClick={handleClick}>
            Clear
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="formInput">
        <label>
          <input
            onChange={handleChange}
            type="text"
            value={query}
            placeholder={placeholderText}
          />
        </label>
        <button type="submit" className="btnSubmit">
          Search
        </button>
      </form>
    </>
  );
};

export default Form;
