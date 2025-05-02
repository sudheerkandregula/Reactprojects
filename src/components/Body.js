import Restaurantcard,{withpromotedlabel} from "./RestaurantCard";
import { useState, useEffect } from "react";
import ShimmerCard from "./Shimmer";
import { Link } from "react-router-dom";


const Body = () => {
  const [reslist, setrestlist] = useState([]);
  const [searchlist, setsearchlist] = useState("");
  const [filteredlist, setfilteredlist] = useState([]);
  const RestaurantCardPromoted = withpromotedlabel(Restaurantcard);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.43900819406641&lng=78.38448805974481&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    const restaurants = json.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    console.log(restaurants);
    setrestlist(restaurants);
    setfilteredlist(restaurants);
  };

  const handleSearch = () => {
    const filtered = reslist.filter((res) =>
      res.info.name.toLowerCase().includes(searchlist.toLowerCase())
    );
    setfilteredlist(filtered);
  };

  const handleTopRated = () => {
    const filtered = reslist.filter((res) => res.info.avgRating > 4.1);
    setfilteredlist(filtered);
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between m-4">
        <div className="flex">
          <input
            className="w-100 border border-solid border-gray-400 px-2 rounded-lg mx-4"
            type="text"
            value={searchlist}
            onChange={(e) => setsearchlist(e.target.value)}
            placeholder="search restaurants..."
          />
          <button onClick={handleSearch} className="border border-solid border-blue-200 px-4 py-2 rounded-lg text-black hover:bg-blue-300 cursor-pointer">Search</button>
        </div>

        <button className="border border-solid border-blue-200 px-4 py-2 rounded-lg text-black hover:bg-blue-300 cursor-pointer" onClick={handleTopRated}>Top Rated Restaurants</button>
      </div>
      <div className="flex flex-wrap w-10/12 items-center justify-between m-auto">
        {filteredlist.length === 0
          ? Array(8).fill(null).map((_, index) => <ShimmerCard key={index} />)
          : filteredlist
              .filter((res) => res?.info?.id)
              .map((res) => (
                <Link key={res.info.id} to={`/restaurants/${res.info.id}`}>
                  <Restaurantcard resobj={res} />
                </Link>
              ))}
      </div>
    </div>
  );
};

export default Body;
