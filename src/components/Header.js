import { logo } from "./utils/constants";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "./utils/UserContext";
import { useSelector } from "react-redux";

const Header = () =>{
    const [login,setlogin] = useState('Login');

    const {loggedinUser} = useContext(UserContext);

    const cartItems = useSelector((store) => store.cart.items);

    return(
        <div className='flex justify-between bg-green-200 m-2 rounded-lg shadow-lg h-30'>
            <div className='w-52'>
                <img className="w-28 m-2 p-2 rounded-3xl" src={logo} alt='logo'/>
            </div>
            
            <div className='flex p-4 m-4'>
                <ul className="flex items-center">
                    <li className="px-4">
                        <Link to='/'>🏠Home</Link>
                    </li>
                    <li className="px-4">
                        <Link to='/about'>ℹ️About Us</Link>
                    </li>
                    <li className="px-4">
                        <Link to='/contact'>✉️Contact Us</Link>
                    </li>
                    <li className="px-4">
                        <Link to='/grocery'>🛍️Grocery</Link>
                    </li>
                    <li className="px-4">
                        <Link to='/cart'>🛒Cart ({cartItems.length} items)</Link>      
                    </li>
                    <button className="items-center px-4" onClick={()=>setlogin(login==='Logout'?'Login':'Logout')}>👤{login}</button>
                    <li>- {loggedinUser}</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;