import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("Mario");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

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

    // resource is /blogs
    // run server: npx json-server --watch data/db.json --port 8000

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    })
      .then(() => {
        console.log('new blog added');
        setIsLoading(false);
      });

    setTitle("");
    setBody("");
    setAuthor("mario");

    // history is like going back and forth the routes
    // go back 1
    // history.go(-1);
    // redirect to home page
    history.push('/');
  };

  return (
    <div className="create">
      <h2>Add a new Blog</h2>
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
        {!isLoading && <button>Add blog</button>}
        {isLoading && <button disabled>Adding blog...</button>}
      </form>
    </div>
  );
};

export default Create;