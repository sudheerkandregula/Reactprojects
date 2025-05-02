import { useState,useEffect } from "react";

  const useRestaurantMenu =(resid) => {
    const [menuItems, setMenuItems] = useState(null);
    useEffect(() => {
      fetchdata();
    }, []);

    const fetchdata = async()=>{
      const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.43900819406641&lng=78.38448805974481&restaurantId=${resid}`);  
      const json = await data.json();

      setMenuItems(json);
    };
    
    return menuItems;
};

export default useRestaurantMenu;