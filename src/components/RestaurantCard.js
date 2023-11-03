import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { listData } = props;

  const styleCard = {
    backgroundColor: "#f0f0f0",
  };

  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    deliveryTime,
  } = listData?.info ?? "";

  return (
    <div className="res-card" style={styleCard}>
      <img
        className="res-logo"
        alt="food image"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3>{name}</h3>
      <h4>{cuisines?.join(", ")}</h4>
      <h4>{avgRating}</h4>
      <h4>Rs.{costForTwo} FOR TWO </h4>
      <h4>{deliveryTime}</h4>
    </div>
  );
};

export default RestaurantCard;
