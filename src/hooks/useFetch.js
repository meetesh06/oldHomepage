import { useEffect, useState } from "react";
import axios from 'axios';

const useFetch = (url, other = {}) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(url, other)
      .then(function (response) {
        setResponse(response);
      })
      .catch(function (error) {
        setError(error)
        console.warn("FetchHook: ", error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [url]);
  return { response, loading, error };
};

export default useFetch;