import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from './utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';

const RestaurantMenu = () => {
  const { resid } = useParams();
  const menuItems = useRestaurantMenu(resid);

  const [showIndex,setshowIndex] = useState(null);

  if (!menuItems) {
    return <div>Loading restaurant data...</div>;
  }

  // ✅ Safely extract restaurant info
  const restaurantInfo = menuItems?.data?.cards?.find(
    (card) => card.card?.card?.info
  )?.card?.card?.info;

  const { name, cuisines, costForTwoMessage } = restaurantInfo || {};

  // ✅ Extract categories (menu sections)
  const categoryCards = menuItems?.data?.cards?.find(
    (card) => card.groupedCard
  )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  const categories = categoryCards?.filter(
    (c) =>
      c.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="text-center m-2 p-2">
      <h1 className="text-2xl font-bold">{name}</h1>
      <h2 className="text-gray-600">{cuisines?.join(', ')}</h2>
      <h3 className="text-green-600">{costForTwoMessage}</h3>

      {categories.map((c,index)=> (
        <RestaurantCategory key={c?.card?.card?.title}
         data={c?.card?.card} 
         showItems={index===showIndex ? true : false}
         setshowIndex = {()=> setshowIndex(index )}
         />))}
    </div>
  );
};

export default RestaurantMenu;

