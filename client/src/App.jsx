import React, { useEffect } from "react";
import axiosConfig from "./axiosConfig";

const App = () => {
  const fetchCats = async () => {
    const response = await axiosConfig({
      url: "/graphql",
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
