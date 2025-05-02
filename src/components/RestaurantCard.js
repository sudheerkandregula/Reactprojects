import { IMG_CDN_URL } from "./utils/constants";

const Restaurantcard = ({ resobj }) => {
  const { 
    name, 
    cloudinaryImageId, 
    costForTwo, 
    cuisines, 
    avgRating 
  } = resobj?.info || {}; // fallback to empty object

  return (
    <div className="flex flex-col p-1 mx-4 my-4 rounded-lg w-65 h-65 overflow-hidden hover:scale-105 hover:shadow-lg">
      {/* Image Section */}
      <img 
        className="w-full h-40 object-cover rounded-lg" 
        src={IMG_CDN_URL + cloudinaryImageId} 
        alt="Restaurant Image" 
      />
      
      {/* Text Section */}
      <div className="flex flex-col justify-between h-auto">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <h6 className="text-sm text-gray-600 mb-1 truncate">{cuisines?.join(', ')}</h6>
        <div className="flex justify-between mt-auto pt-2">
          <h5 className="text-sm text-yellow-500 mb-1">{avgRating} ⭐ Rating</h5>
          <h6 className="text-sm text-gray-800 font-semibold">{costForTwo}</h6>
        </div>
      </div>
    </div> 
  );
};


export const withpromotedlabel = (Restaurantcard)=>{
  return () => {
    return(
      <div>
        <label>Promoted</label>
        <Restaurantcard />
      </div>
    );
  };
};


export default Restaurantcard;
