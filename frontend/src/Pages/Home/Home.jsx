import React, { useState, useEffect, useContext } from "react";
import "./Home.css";
import Spinner from "../../Components/Spinner/Spinner";
import Card from "../../Components/Card/Card";
import { DataContext } from "../../Context/DataContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(true);
  const [
    homeData,
    user,
    setUser,
    userData,
    setUserData,
    cartData,
    setCartData,
  ] = useContext(DataContext);
  const Navigate = useNavigate();

  useEffect(async () => {
    if (homeData !== undefined) {
      setLoading(false);
    }
  }, [homeData]);

  const navigateToPage = (catalog) => {
    Navigate(`/catalog/${catalog}`);
  };

  const renderCards = (data) => {
    let fragment = (
      <div className="arrange__Cards">
        {data.map((ele) => {
          return (
            <Card
              product={Object.values(ele)[0]}
              catalog={Object.keys(ele)[0]}
            />
          );
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
            onClick={() => navigateToPage("processor")}
            src="https://www.primeabgb.com/wp-content/uploads/2021/12/Intel-12th-Gen.jpg"
            alt="banner"
          />
          <div className="home__Products">
            <p>Today's Deals</p>
            {renderCards(homeData[0].deals)}
          </div>
          <img
            onClick={() => navigateToPage("cabinet")}
            src="https://cdn.mdcomputers.in/image/catalog/2022/january/08-01-22/bundle-offer-for-gamers-1325xx300px.jpg"
            alt="banner"
          />
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
