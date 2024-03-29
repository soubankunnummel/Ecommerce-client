import React, { useContext, useEffect,  useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit"; 
// import { Products } from "./Products";
import { useNavigate } from "react-router-dom";
import "./Navebar.css";
import { Productcontext } from "../Context";
import { Axios } from "../App";
import toast from "react-hot-toast";

export default function   Navebar() {
  const [serchTerm, setSerchTerm] = useState("");
  const [products, setProducts] = useState([])
  const [showBasic, setShowBasic] = useState(false);
  const navigat = useNavigate();
  const { fetchCartCount , count} = useContext(Productcontext);
  const userId = localStorage.getItem("userId")
  let storUseName = localStorage.getItem("userName");
  fetchCartCount()

  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await Axios.get("/api/users/allProducts")
        if(response.status === 200){
          setProducts(response.data.data)
        }
      } catch (error) {
        toast.error(error.response.data.message)
        
      }
    }
    fechData()
  },[setSerchTerm])

  // set category names 
  const LivingRoom = "Living Room"
  const Bedroom = "Bedroom"
  

  // {  products.map((item) => item.category) }
  // const LivingRoom = products.filter((item) => item.category === "Living Room")
  // const Bedroom = products.filter((item) => item.category === "Bedroom");


  
 

  // handle wishlist
  const handleWishlist = () => {
    if(storUseName){
      navigat(`/wishList/${userId}`)
    }
    else{

      window.confirm("You have to Login ")
      navigat("/Login")
    }
  }

  // handle Oders

  const handleOrders = () => {
    if(storUseName) {
      navigat(`/Orders/${userId}`)
    }else{

      window.confirm("You have to Login ")
      navigat("/Login")
    }
  }

  // handle log out

  const hanleLogOUt = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    storUseName = null;
    navigat("/");
  };
  return (
    <>
      <MDBNavbar
        expand="lg"
        className="nav-main"
        style={{ boxShadow: "none" }}
        light
        bgColor=""
      >
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">
            <div className="logo-img ms-2">
              <img
                onClick={() => navigat("/")}
                src={require("../images/RedWood logo black.png")}
                style={{ width: 50 }}
                alt=""
              />

              <img
                src={require("../images/redwood text.png")}
                style={{ width: 60 }}
                className="mt-2"
                alt=""
              />
            </div>
          </MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mx-5 mb-lg-0 nav-main">
              <MDBNavbarItem>
                <MDBNavbarLink
                  onClick={() => navigat("/")}
                  active
                  aria-current="page"
                  href="#"
                >
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink onClick={() => navigat("/All")} href="">
                  Products
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Categories
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                
                  <MDBDropdownItem onClick={() => navigat(`/LivingRoom/${LivingRoom}`)} link>
                    Living Room
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={() => navigat("/DinigRoom")} link>
                    Dining Room
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={() => navigat(`/Bedroom/${Bedroom}`)} link>
                    Bedroom Furniture
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarNav>
            <form className="d-flex input-group w-auto">
              <input
                onChange={(e) => setSerchTerm(e.target.value)}
                id="searchInput"
                type="search"
                className="form-control"
                placeholder="Search items"
                aria-label="Search"
                style={{ width: "500px", borderRadius: 20 }}
              />
            </form>
            {serchTerm ? (
              <>
                <div className="search-results">
                  {products
                    .filter((val) => {
                      if (serchTerm === "") {
                        return true; 
                      } else if (
                        val.title.toLowerCase().includes(serchTerm.toLowerCase())
                      ) {
                        return true; 
                      }
                      return false; 
                    })
                    .map((item) => (
                      <div className="search-result-item" key={item._id}>
                        <hr />
                       
                        <p
                          onClick={() => {
                            navigat(`/View/${item._id}`);
                            setSerchTerm("");
                          }}
                          className="sech-result"
                        >
                          {item.title}
                        </p>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              ""
            )}
            <MDBDropdown group className="shadow-0">
              <MDBDropdownToggle color="white">
                <MDBIcon
                  fas
                  icon="user-circle"
                  className="ms-1 me-2"
                  style={{ fontSize: "30px" }}
                />
              </MDBDropdownToggle>
              <MDBDropdownMenu>
              {storUseName === null || undefined ? <span></span> : (
            <>
            <MDBDropdownItem link onClick={() => navigat("/")}>
            <MDBIcon far icon="user" />
             <span className="ms-2">{storUseName}</span>
              </MDBDropdownItem>
              </>
            )}

                <MDBDropdownItem  link onClick={() => handleWishlist() }>
                <MDBIcon style={{marginLeft:1}} far icon="heart"  /> 
                <span className="ms-2">Wishlist</span> 
                </MDBDropdownItem>

                <MDBDropdownItem  link onClick={() => handleOrders()}>
                <MDBIcon fas icon="box-open" />
                <span className="ms-2">Orders</span> 
                </MDBDropdownItem>

                {storUseName === null ? (
                  
                  <MDBDropdownItem link
                    className=""
                    onClick={() => navigat("/Login")}
                  >
                    <MDBIcon fas icon="sign-in-alt" />
                    <span className="ms-2"> Sign In</span>
                  </MDBDropdownItem>
                
                ) : (
                
                  <MDBDropdownItem link onClick={hanleLogOUt}>
                  <MDBIcon fas icon="sign-out-alt" />
                   <span className="ms-2">sign out</span>
                  </MDBDropdownItem>
                  
                )}
              </MDBDropdownMenu>
            </MDBDropdown>
            {storUseName === null ? (
              ""
            ) : (
              <>
               
                  <MDBIcon
                    fcas
                    icon="cart-plus"
                    color="black"
                    className="mx-1"
                    onClick={() => navigat(`/cart/${userId}`) }
                  />
                
                <span>{count} </span>
              </>
            )}
        
               

          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
