import React,{lazy,Suspense, useEffect, useState} from 'react';
import ReactDom from 'react-dom/client';
import Header from './src/components/Header';
import Body from './src/components/Body';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Error from './src/components/Error';
import About from './src/components/About';
import Contact from './src/components/Contact';
import RestaurantMenu from './src/components/RestaurantMenu';
import UserContext from './src/components/utils/UserContext';
import { Provider } from 'react-redux';
import appStore from './src/components/utils/appStore';
import Cart from './src/components/Cart';

const Grocery = lazy(()=>import('./src/components/Grocery'));

const App = () =>{

    const [userName,setuserName] = useState();

    useEffect(()=> {
      const data = {
        name : 'Sudheer Kandregula',
      };
      setuserName(data.name);
    },[]);

    return(
      <Provider store={appStore}>
        <UserContext.Provider value={{loggedinUser : userName}}>
          <div>
              <Header/>
              <Outlet />
          </div>
        </UserContext.Provider>
        </Provider>
    ) 
};


const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children:[
        {
            path: "/",
            element: <Body />,
          },
        {
            path: "/about",
            element: <About />,
        },
        {
            path: "/contact",
            element: <Contact />,
        },
        {
          path: "/grocery",
          element: <Suspense fallback={<h1>loading.....</h1>}><Grocery /></Suspense>,
      },
        {
            path: "/restaurants/:resid",
            element: <RestaurantMenu />,
        },
        {
            path: "/cart",
            element: <Cart />,
        }
      ]
    },
    
  ]);


const root = ReactDom.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);

export default App;
