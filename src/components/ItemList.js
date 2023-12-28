import React from "react";
import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // Dispatch an action
    dispatch(addItem(item));
  };

  return (
    <ul className="ml-4 space-y-4 m-6">
      {items.map((item, index) => (
        <li
          key={item.card.info.id}
          className={`text-gray-700 hover:text-blue-500 transition duration-300 ${
            index < items.length - 1 ? "border-b border-gray-300 pb-2" : ""
          }`}
        >
          <div className="flex items-start">
            <div className="w-1/5 relative">
              {item.card.info.imageId && (
                <img
                  src={CDN_URL + item.card.info.imageId}
                  alt={item.card.info.name}
                  className="w-full h-auto rounded-lg"
                />
              )}
              <button
                onClick={() => handleAddItem(item)}
                className="absolute top-2 left-2 bg-gray-200 text-black text-xs py-1 px-2 rounded-md"
              >
                Add +
              </button>
            </div>
            <div className="w-4/5 ml-4">
              <div className="font-semibold">{item.card.info.name}</div>
              <div className="text-sm text-gray-600">
                {item.card.info.description}
              </div>
            </div>
            <div className="text-black-500">
              Rs.
              {(item.card.info.price || item.card.info.defaultPrice) / 100}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
