import React from 'react';
import {IMG_CDN_URL} from './utils/constants';
import { useDispatch } from 'react-redux';
import { addItem } from './utils/cartSlice';


const ItemList = ({items}) => {

    const dispatch = useDispatch();

    const handleAddItems = (item) =>{
        dispatch(addItem(item)); 
    };

  return (
  <div>
    {items.map((item)=>( 
        <div key={item.card.info.id} className='p-2  border-gray-200 border-b-2 text-left flex justify-between'>
                <div className='w-9/12 m-2 p-2'>
                    <div className='py-2'>
                        <span className='text-md font-bold'>{item.card.info.name}</span>
                        <span> - ₹{(
                                (item.card.info.finalPrice ??
                                item.card.info.price ??
                                item.card.info.defaultPrice ?? 0) / 100
                            ).toFixed(2)}</span>
                    </div>
                    <p className='text-xs'>{item.card.info.description}</p>
                </div>
                <div className='w-3/12'>
                    <div className='absolute justify-end'>
                        <button className='p-2 mx-14 mt-15 rounded-lg bg-black text-white shadow-lg cursor-pointer' onClick={()=>handleAddItems(item)}>Add +</button>
                    </div>
                    <img className="h-25 w-40 rounded" src={IMG_CDN_URL + item.card.info.imageId}/>
                </div>
        </div>))}
  </div>
  )
};
export default ItemList;
