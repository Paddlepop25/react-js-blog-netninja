// https://dev.to/pallymore/clean-up-async-requests-in-useeffect-hooks-90h
// resource is /blogs
// run server: npx json-server --watch data/db.json --port 8000

import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortController.signal }) // signal is options for fetch
        .then(response => {
          if (!response.ok) {
            throw Error('Could not fetch data...');
          }
          return response.json();
        })
        .then(data => {
          setData(data);
          setIsLoading(false);
          setError(null);
        })
        .catch(error => {
          if (abortController.signal.aborted) {
            console.log('Fetch aborted...');
          } else {
            setIsLoading(false);
            setError(error.message);
          }
        });
    }, 1000);

    return () => abortController.abort(); // abort whatever fetch it's associated with
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;


