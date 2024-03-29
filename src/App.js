import { Await, Route, Routes } from "react-router-dom";
import "./App.css";
import { Productcontext } from "./Context";

import { Products } from "./componets/Products";
import { BedroomProducts } from "./componets/catogerys/BedroomProdu";
import { DinigRoom } from "./componets/catogerys/Dinigroom";
import { Livinroom } from "./componets/catogerys/LiviroomProduct";
import Home from "./pages/Home";
import Login from "./user/Login";
import Register from "./user/Register";
import { useEffect, useState } from "react";
import Footer from "./componets/Footer";
import Cart from "./pages/Cart";
import View from "./pages/View";
import Bedroom from "./componets/catogerys/Bedroom";
import DiningRoom from "./componets/catogerys/DiningRoom";
import LivingRoom from "./componets/catogerys/LivingRoom";

import Pyment from "./pages/Pyment";

import AllProducts from "./componets/AllProducts";
import { userList } from "./user/UserList";
import AdminLogin from "./componets/Admin/Admin-login";
import { AdminDetails } from "./componets/Admin/AdminDetail";

import ViewPoduct from "./componets/Admin/ViewProduct";
import Editporaduct from "./componets/Admin/Editporaduct";
import Addproduct from "./componets/Admin/Addproduct";
import ViewUsers from "./componets/Admin/ViewUsers";
import ViewMoredetail from "./componets/Admin/ViewMoredetail";
import Allproducts from "./componets/Admin/Allproducts";
import Alloders from "./componets/Admin/Alloders";
import Paypal from "./componets/Pypal";
import Kichen from "./componets/kichen";
import Living from "./componets/Living";
import Dining from "./componets/Dining";
import Bed from "./componets/Bed";
import Works from "./componets/Works";
import Outdor from "./componets/Outdor";
import Bathroom from "./componets/Bathroom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import WishList from "./pages/WishList";
import SuccessPayment from "./componets/Success";
import Orders from "./componets/Orders";

export const Axios = axios.create({
  baseURL : process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type":"application/json",
    Authorization: localStorage.getItem('jwt'),
  }

})


function App() {
  // console.log(process.env.REACT_APP_BASE_URL)
  const handlClick = (item) => {
    console.log(item);
  };
  const userId = localStorage.getItem("userId")
  const [itemCount, setItemCount] = useState([]);
  const [productss,setProductss] = useState(Products)
  const [BedroomProductss] = useState(BedroomProducts)
  const [DinigRooms] = useState(DinigRoom)
  const [LivingRooms] = useState(Livinroom)
  const [admin,setAdmin] = useState(AdminDetails)


  const [user, setUser] = useState([]); 
  const [cart, setCart] = useState([]);
  const [serchTerm, setSerchTerm] = useState("");
  const [login,setLogin] = useState(userList)

  // api fetching
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [userName, setUerName] = useState([]);
  const [cartCount, setCartCount] = useState("")
  const [wishLit ,setWishlist] = useState([])
  const [wishStatus, setWishStatus] = useState(false)
  const count  = cartCount.length
  
  // wishList fetching

  const fetchWishList = () => {

    
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/api/users/${userId}/wishlist`)
        if(response.status === 200){
            setWishlist(response.data.data)
            setWishStatus(true)
          }
          
        } catch (error) {
          // console.log(error)
          
        }
        

      }
      return fetchData()
    }

    useEffect(() => {
    fetchWishList()
  },[])

  // add to wishlit

  const addToWishlist = async (productId) => {
   
    try {
      await Axios.post(`/api/users/${userId}/wishlists`,{productId})
      const response = await Axios.get(`api/users/${userId}/wishlists`)
      if(response.status === 200){
        toast.success("Added to wishlist")
        setWishlist(response.data.data)

      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  
  // fetching cart producnts 

  const fetchCartCount = async () => {
    const fetchDatas = async () => {
      try {
        const response = await Axios.get(`/api/users/${userId}/cart`)
        if(response.status === 200){
          setCartCount(response.data.data)
        }
      } catch (error) {
        console.log(error)
        
      }
    }
    return fetchDatas()
  }
  useEffect(() => {
    fetchCartCount()
  },[])
 
  useEffect(() => {
  return  Axios
  },[Axios])

  return (
    <>
   
    <div className="App">
      
      <Productcontext.Provider
        value={{
          admin,setAdmin,
          login,setLogin,
          serchTerm,
          setSerchTerm,
          setCart,
          LivingRooms,
          DinigRooms,
          BedroomProductss,
          productss,setProductss,
          cart,
          user,
          setUser,
          
          itemCount,
          setItemCount,
          //api states
          users,
          products,
          setProducts,cartCount, setCartCount,
          userName, setUerName,wishLit ,setWishlist,addToWishlist,
          fetchWishList,wishStatus, setWishStatus, fetchCartCount,
          count

        }}
        
      >
         <Toaster position="top-center" reverseOrder={false} />
        <Routes>

          if (BedroomProducts) {<Route path="/Bedroom/:categoryname" element={<Bedroom />} />}
          if (DinigRoom) {<Route path="/DinigRoom" element={<DiningRoom />} />}
          if (LivingRoom){" "}
          {<Route path="/LivingRoom/:categoryname" element={<LivingRoom />} />}
          <Route path="/" element={<Home handlClick={handlClick} />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/All" element={<AllProducts />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Cart/:id" element={<Cart />} />
          <Route path="/Pyment" element={<Pyment />} />
          <Route path="/View/:id"  element={<View/>}/>
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/ViewProduct" element={<ViewPoduct/>}/>
          <Route path="/EditProduct/:id" element={<Editporaduct/>}/> 
          <Route path="/Addproducts" element={<Addproduct/>}/>
          <Route path="/Users" element={<ViewUsers/>}/>
          <Route path="/More/:id" element={<ViewMoredetail/>}/>
          <Route path="/Allproduct" element={<Allproducts/>}/>
          <Route path="/Alloerders" element={<Alloders/>}/>
          {/* <Route path="/pypal" element={<Paypal/>}/> */}
          <Route path="/kichen" element={<Kichen/>}/>
          <Route path="/Living" element={<Living/>}/>
          <Route path="/Dinig" element={<Dining/>}/>
          <Route path="/Bed" element={<Bed/>}/>
          <Route path="/work" element={<Works/>}/>
          <Route path="/Outdor" element={<Outdor/>}/>
          <Route path="/Bath" element={<Bathroom/>}/>
          <Route path="/wishList/:id" element={<WishList/>} />
          <Route path="/payment/success" element={<SuccessPayment/>}/>
          <Route path="/Orders/:id" element={<Orders/>} />
        


        </Routes>
        <div className="footer">
          <Footer />
        </div>
      </Productcontext.Provider>
    </div>
    </>
  );
}

export default App;
