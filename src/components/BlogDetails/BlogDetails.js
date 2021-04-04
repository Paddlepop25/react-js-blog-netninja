import { useParams, useHistory } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const BlogDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data: blog, isLoading, error } = useFetch(`http://localhost:8000/blogs/${id}`);

  const handleDeleteBlog = () => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'DELETE',
    }).then(() => history.push('/'));
  };

  return (
    <div className="blog-details">
      <h2>Blog Details</h2>
      {isLoading && <div>Loading...</div>}
      {error && alert('Something went wrong 🏄‍♂️')}
      {blog &&
        <article>
          <h2>{blog.title}</h2>
          <p>Written by: {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
         </article>}

    </div>
  );
};

export default BlogDetails;