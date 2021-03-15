import React, { useEffect } from "react";
import axios from "axios";

axios.defaults.method = "POST";
axios.defaults.headers.post["Content-Type"] = "application/json";

const App = () => {
  const fetchCats = async () => {
    const response = await axios({
      url: "https://caturday-backend.herokuapp.com/graphql",
      method: "POST",
      data: {
        query: `
          query {
            getAllPosts {
              title
            }
          }
        `,
      },
    });
    return response.data;
  };
  useEffect(async () => {
    console.log("running");
    const data = await fetchCats();
    console.log("finished");
    console.log(data);
  }, []);

  return (
    <>
      <h1>One cats a day, troubles go away</h1>
    </>
  );
};

export default App;
