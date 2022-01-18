import React, { createContext, useEffect, useState } from "react";
import apiURl from "../Api";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [homeData, setHomeData] = useState();
  const [user, setUser] = useState(localStorage.getItem("cjuser"));
  const [userData, setUserData] = useState([]);
  const [cartData, setCartData] = useState(0);

  useEffect(async () => {
    let data = await fetch(apiURl).then((res) => res.json());
    setHomeData(data);

    if (user) {
      let account = await fetch(`${apiURl}/account/${user}`).then((res) =>
        res.json()
      );
      await setUserData([...account]);
    }
  }, []);

  return (
    <DataContext.Provider
      value={[
        homeData,
        user,
        setUser,
        userData,
        setUserData,
        cartData,
        setCartData,
      ]}
    >
      {props.children}
    </DataContext.Provider>
  );
};
