import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="not-found">
      <h2>Sorry 😿</h2>
      <p>That page cannot be found</p>
      <button><Link to='/'>Back to the homepage...</Link></button>
    </div>
  );
};

export default PageNotFound;