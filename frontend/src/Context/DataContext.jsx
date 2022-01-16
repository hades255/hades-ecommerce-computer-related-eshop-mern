import React, { createContext, useEffect, useState } from "react";
import apiURl from "../Api";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [homeData, setHomeData] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(async () => {
    let data = await fetch(apiURl).then((res) => res.json());
    setHomeData(data);
  }, []);

  return (
    <DataContext.Provider value={[homeData, loggedIn, setLoggedIn]}>
      {props.children}
    </DataContext.Provider>
  );
};
