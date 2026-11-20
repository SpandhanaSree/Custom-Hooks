
import { useState, useEffect, useCallback } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    const controller = new AbortController();

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }

    return controller;
  }, [url]);

  useEffect(() => {
    const controllerPromise = fetchData();

    let cancelled = false;

    controllerPromise.then((controller) => {
      if (cancelled) controller.abort();
    });

    return () => {
      cancelled = true;
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetch;
