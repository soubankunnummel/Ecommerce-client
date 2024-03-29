import './Login.css'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,

} from "mdb-react-ui-kit";
import {  useNavigate } from "react-router-dom";
import axios from "axios"
import toast from 'react-hot-toast'


export default function Login(props) { 

  const navigate = useNavigate();
  const handlLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim().toLowerCase();
    const password = e.target.password.value.trim();
    const adminUserName = process.env.REACT_APP_ADMIN_USER_NAME
   
    if (username === "" || password === "") {
      toast.error("Enter all the inputs");
      return;
    }
    let url = "https://ecomers-server.onrender.com/api/users/login";
  
    if (username === adminUserName) {
      url = "https://ecomers-server.onrender.com/api/admin/login";
    }
    try {
      const payload = { username, password };
      const response = await axios.post(url, payload);
  
      if (response.status === 200 ) {
        username !== adminUserName && localStorage.setItem("userId", response.data.id);
        username === adminUserName && localStorage.setItem("role", "admin")
        localStorage.setItem("jwt", response.data.data);
        localStorage.setItem("userName", response.data.username);
        

        if (username === adminUserName) {
          navigate("/ViewProduct");
          toast.success("Login Successful");
        } else {
          setTimeout(() => {
            localStorage.removeItem("jwt");
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
          }, 3600000);
          navigate("/");
          toast.success("Login Successful");
        
        }
      } 
      else {
        toast.error(response.message);
      } 
    } catch (error) {
      console.log(error);
      toast.error("Invalid username or password");
    }
  };
  
  const navigat = useNavigate();
  
  TODO://add Fomik validation 
  return (
    <>
      <div className="login-main ">
        <MDBContainer>
          <MDBRow className="">
            <MDBCol sm="6">
              <div className="d-flex flex-row ps-5 my-4 ">
                {/* <MDBimg  style={{ color: '#709085' }}/> */}
                <img
                  src={require("../images/RedWood logo black.png")}
                  className="logo-img"
                  alt="logo-png"
                />
                <span className="h1 fw-bold mb-0"></span>
              </div>

              <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
                <h3
                  className="fw-normal mb-3 ps-5 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Log in
                </h3>
                <form action="" onSubmit={handlLogin}>
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    label="User Name"
                    id="formControlLg"
                    type="text"
                    name="username"
                    size="lg"
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    name="password"
                    size="lg"
                    
                    required
                  />

                  <MDBBtn
                    className="mb-4 px-5 mx-5 w-100"
                    color="info"
                    size="lg"
                  >
                    Login
                  </MDBBtn>
                </form>
              
                <p>  Don't have an account?  <a href="#!" className="link-info" onClick={()=> navigat('/Register')}>
                    Register here
                  </a> </p>
                
              </div>
            </MDBCol>

            <MDBCol sm="6" className="d-none d-sm-block px-0">
              <img
                src="https://www.ikea.com/ext/ingkadam/m/4ddfe585f78fe26e/original/PE840208-crop001.jpg?f=s"
                alt=""
                className="w-100"
                style={{ objectFit: "cover", objectPosition: "left" }}
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      
    </>
  );
}
