import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [homeData, setHomeData] = useState();

  useEffect(async () => {
    let data = await fetch("http://localhost:3001/").then((res) => res.json());
    setHomeData(data);
  }, []);

  return (
    <DataContext.Provider value={[homeData]}>
      {props.children}
    </DataContext.Provider>
  );
};
