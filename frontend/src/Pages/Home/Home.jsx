import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import Spinner from "../../Components/Spinner/Spinner";
import Card from "../../Components/Card/Card";
import { DataContext } from "../../Context/DataContext";

function Home() {
  const [loading, setLoading] = useState(true);
  const [homeData] = useContext(DataContext);

  useEffect(async () => {
    if (homeData !== undefined) {
      setLoading(false);
    }
  }, [homeData]);

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
