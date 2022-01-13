import React, { createContext, useEffect, useState } from "react";
import apiURl from "../Api";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [homeData, setHomeData] = useState();

  useEffect(async () => {
    let data = await fetch(apiURl).then((res) => res.json());
    setHomeData(data);
  }, []);

  return (
    <DataContext.Provider value={[homeData]}>
      {props.children}
    </DataContext.Provider>
  );
};
