import React, { useState, useEffect } from "react";
import "./Home.css";
import Spinner from "../../Components/Spinner/Spinner";
import Card from "../../Components/Card/Card";

function Home() {
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState();

  useEffect(async () => {
    let data = await fetch("http://localhost:3001/").then((res) => res.json());
    setHomeData(data);
    setLoading(false);
  }, []);

  const renderCards = (data) => {
    let fragment = (
      <div className="arrange__Cards">
        {data.map((ele) => {
          return <Card product={ele} />;
        })}
      </div>
    );
    return fragment;
  };
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
          <div className="home__Products">
            <p>Today's Deals</p>
            {renderCards(homeData[0].deals)}
          </div>
          <div className="home__Products">
            <p>New Arrivals</p>
            {renderCards(homeData[0].new)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
