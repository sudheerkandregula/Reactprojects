import React, { useState } from 'react'
import ItemList from './ItemList';


const RestaurantCategory = ({data,showItems,setshowIndex}) => {
    const handleclick = () => {
        setshowIndex();
    }
    console.log(data);
  return (
    <div>
      <div className='w-6/12 mx-auto my-4 rounded-lg bg-gray-50 shadow-lg p-4'>
        <div className='flex justify-between cursor-pointer' onClick={handleclick}>
            <span className='font-bold text-sm'>{data.title} ({data.itemCards.length})</span>
            <span>⯆</span>
        </div>
        {showItems && <ItemList items={data.itemCards}/>}
      </div>
    </div>
  )
};

export default RestaurantCategory;
