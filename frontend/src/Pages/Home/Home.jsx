import React, { useState, useEffect } from "react";
import "./Home.css";
import Spinner from "../../Components/Spinner/Spinner";

function Home() {
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState();

  useEffect(async () => {
    let data = await fetch("http://localhost:3001/").then((res) => res.json());
    setHomeData(data);
    setLoading(false);
  }, []);
  return (
    <div className="home__Container">
      {loading ? (
        <Spinner />
      ) : (
        <div className="banner">
          <img
            src="https://www.primeabgb.com/wp-content/uploads/2021/12/Intel-12th-Gen.jpg"
            alt="banner"
          />
        </div>
      )}
    </div>
  );
}

export default Home;
