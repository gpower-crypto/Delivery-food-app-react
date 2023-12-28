import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    deliveryTime,
  } = resData?.info ?? "";

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden res-card transition-transform transform hover:scale-105 hover:shadow-lg">
      <img
        className="w-full h-40 object-cover"
        alt={name}
        src={CDN_URL + cloudinaryImageId}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 font-serif">{name}</h3>
        <p className="text-gray-600 text-sm mb-2">{cuisines?.join(", ")}</p>
        <p className="text-yellow-500 text-sm mb-2">{avgRating}</p>
        <p className="text-gray-600 text-sm mb-2">Rs.{costForTwo} FOR TWO</p>
        <p className="text-gray-600 text-sm">{deliveryTime} delivery time</p>
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label>Promoted</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
export default RestaurantCard;
