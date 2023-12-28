import React, { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ category, showItems, toggleCategory }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md bg-white">
      <div
        onClick={toggleCategory}
        className="cursor-pointer font-semibold text-lg bg-gray-100 p-4 flex justify-between items-center"
      >
        <span>
          {category.card.card.title} ({category.card.card.itemCards.length})
        </span>
        <span
          className={`transform transition-transform ${
            showItems ? "rotate-180" : "rotate-0"
          }`}
        >
          ▾
        </span>
      </div>
      {showItems && <ItemList items={category.card.card.itemCards} />}
    </div>
  );
};

export default RestaurantCategory;
