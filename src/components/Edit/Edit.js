import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import useFetch from '../../hooks/useFetch';

const EditBlog = () => {
  const { id } = useParams();
  // const { data: blog, isLoading, error } = useFetch(`http://localhost:8000/blogs/${id}`);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setBody(data.body);
        setAuthor(data.author);
      });
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const blog = {
      title,
      body,
      author
    };

    setIsLoading(true);

    const abortController = new AbortController();

    setTimeout(() => {
      fetch(`http://localhost:8000/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog),
        signal: abortController.signal
      })
        .then(() => {
          setIsLoading(false);
        });

      setTitle("");
      setBody("");
      setAuthor("mario");

      history.push(`/blog/${id}`);

      return () => abortController.abort(); // abort whatever fetch it's associated with
    }, 1000);
  };

  return (
    <div className="create">
      <h2>Edit Blog</h2>
      {isLoading && <div>Loading...</div>}

      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input type="text" value={title} onChange={handleTitleChange} required />
        <label>Blog body:</label>
        <textarea value={body} onChange={handleBodyChange} required></textarea>
        <label>Blog author:</label>
        <select value={author} onChange={handleAuthorChange}>
          <option value="mario">Mario</option>
          <option value="yoshi">Yoshi</option>
          <option value="luigi">Luigi</option>
        </select>

        {!isLoading && <button>Save blog</button>}
        {isLoading && <button disabled>Saving blog...</button>}
      </form>
    </div>
  );
};


export default EditBlog;