import useFetch from '../../hooks/useFetch';
import BlogList from '../BlogList/Bloglist';

const Home = () => {
  // data: blogs --> rename data as blogs for this file
  const { data: blogs, isLoading, error } = useFetch('http://localhost:8000/blogs');

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}

    </div>
  );
};

export default Home;