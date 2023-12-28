import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import useFetchData from "../utils/useFetchData";
import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useFetchData(MENU_API + resId);

  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (index) => {
    if (index === openCategory) {
      setOpenCategory(null);
    } else {
      setOpenCategory(index);
    }
  };

  if (resInfo === null) {
    return <Shimmer />;
  }

  const { name, cuisines, costForTwoMessage } =
    resInfo.cards[0]?.card?.card?.info;

  const categories =
    resInfo.cards[2].groupedCard.cardGroupMap.REGULAR.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="menu p-4 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">{name}</h1>
        <p className="text-lg text-gray-600 mb-4">
          {cuisines.join(", ")} - {costForTwoMessage}
        </p>
        <h2 className="text-2xl font-semibold mb-4">Menu</h2>
        <div className="space-y-4">
          {categories.map((category, index) => (
            <RestaurantCategory
              key={index}
              category={category}
              showItems={index === openCategory}
              toggleCategory={() => toggleCategory(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
