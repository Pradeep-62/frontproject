import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import toast ,{Toaster} from "react-hot-toast";

import "../../style/authStyle.css";
import { useAuth } from "../../context/auth";
import { baseurl } from "../../URL";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss()
    toast.loading(<b>...Logging In</b>)
    try {
      const res = await axios.post(`${baseurl}/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.dismiss();
        toast.success(<b>You're Logged In</b>);
        
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate(location.state || "/");
        }, 2000)
        
      } else {
        toast.dismiss()
        toast.error(<b>Error occur</b>)
       
      }
    } catch (error) {
      console.log(error);
      toast.dismiss()
      toast.error(<b> {error.message} </b>)
     
    }
  };
  return (
    <Layout title="Register - Ecommer App">
     
            <Toaster/>
          
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
