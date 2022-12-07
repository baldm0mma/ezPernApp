import { useEffect, useState } from "react";
import { useGetData } from "./apiCalls";
import "./App.css";

const App = () => {
  // Add `setRoute` here to play with other routes
  const [route] = useState("/");
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);

  const { isLoading } = useGetData({
    url: `http://localhost:4000${route}`,
    onSuccess: (data) => setData(data),
    onError: (error) => setError(error),
  });

  return (
    <div className="App">
      <main>
        {isLoading && <div>loading...</div>}
        {error && <div>{`There was an error... -> ${error}`}</div>}
        {data.length && <div>{data}</div>}
      </main>
    </div>
  );
};

export default App;
