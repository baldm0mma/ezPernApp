import { useEffect, useState } from "react";
import { useGetData } from "./apiCalls";
import "./App.css";

const App = () => {
  const [route, setRoute] = useState("/");

  useEffect(() => {
    const { data, isLoading, error } = useGetData({
      url: `http://localhost:4000${route}`,
    });
  }, []);

  return <div className="App">Put ur React here, dingus...</div>;
};

export default App;
