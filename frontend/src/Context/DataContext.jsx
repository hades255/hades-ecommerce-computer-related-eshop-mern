import React, { createContext, useEffect, useState } from "react";
import apiURl from "../Api";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [homeData, setHomeData] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("cjuser"));
  const [userData, setUserData] = useState("");

  useEffect(async () => {
    let data = await fetch(apiURl).then((res) => res.json());
    if (user) {
      let account = await fetch(`${apiURl}/account/${user}`).then((res) =>
        res.json()
      );
      setUserData(account);
    }
    setHomeData(data);
  }, []);

  return (
    <DataContext.Provider
      value={[
        homeData,
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        userData,
        setUserData,
      ]}
    >
      {props.children}
    </DataContext.Provider>
  );
};
