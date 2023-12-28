import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import useFetchData from "../utils/useFetchData"; // Import the custom hook

const Body = () => {
  let [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  let [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const onlineStatus = useOnlineStatus();

  const RestaurantPromotedCard = withPromotedLabel(RestaurantCard);

  // Define the API URL for fetching restaurant data
  const apiUrl =
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0826802&lng=80.2707184&page_type=DESKTOP_WEB_LISTING";

  // Use the custom hook to fetch data
  const jsonData = useFetchData(apiUrl);

  // When jsonData updates, set the restaurant data
  useEffect(() => {
    if (jsonData) {
      const restaurantData =
        jsonData?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      setListOfRestaurants(restaurantData);
      setFilteredRestaurants(restaurantData);
    }
  }, [jsonData]);

  if (!onlineStatus) return <h1>Looks like you are offline</h1>;

  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center">
          <input
            type="text"
            data-testid="searchInput"
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4"
            onClick={() => {
              const searchRes = listOfRestaurants?.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              searchText
                ? setFilteredRestaurants(searchRes)
                : setFilteredRestaurants(listOfRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              const filteredRes = listOfRestaurants?.filter(
                (res) => res.info.avgRating > 4
              );
              setFilteredRestaurants(filteredRes);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div
          data-testid="resCard"
          className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredRestaurants?.map((restaurant) => (
            <Link
              to={"/restaurants/" + restaurant.info.id}
              key={restaurant?.info?.id}
            >
              {restaurant.info.promoted ? (
                <RestaurantPromotedCard resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
