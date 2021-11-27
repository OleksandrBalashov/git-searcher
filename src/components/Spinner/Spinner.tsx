import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

interface Props {
  isVisible?: boolean;
}

const Spinner = ({ isVisible = true }: Props) => (
  <div className="Loader">
    <Loader
      type="BallTriangle"
      color="#000000"
      height={70}
      width={70}
      visible={isVisible}
    />
  </div>
);

export default Spinner;
