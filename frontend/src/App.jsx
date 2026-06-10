<<<<<<< HEAD
import { Layout } from "./ui/Layout"
import { Home } from "./pages/Home"
import { CreateTransaction } from "./pages/Transaction"
import { Users } from "./pages/Users"
import { Report } from "./pages/Report"
import { Profile } from "./pages/Profile"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import api from './server'

import { Route, Routes } from "react-router"
import { useEffect } from "react"

export const App = () => {
  useEffect(()=>{
    api.get('/')
      .then((res) => {
        // alert("Backend connection success:")
        console.log("Backend connection success:", res.data)
      })
      
      .catch((err) => {
        // alert("Backend connection failed:")
        console.log("Backend connection failed:", err)
      });
    },[])
  return (
    <Routes>
      <Route path="/" element={ <Layout />}>
        <Route index element={<Home />} />
        <Route path="/transaction" element={<CreateTransaction />} />
        <Route path="/users" element={<Users />} />
        <Route path="/report" element={<Report />} />
        <Route path="/me" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  )
}
=======
import { useEffect, useState } from "react";
import api from "./services";
import Login from "./login.jsx";
import Register from "./register.jsx";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    api.get("/test")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} />
      ) : (
        <Register onSwitch={() => setIsLogin(true)} />
      )}
    </>
  );
}

export default App;
>>>>>>> 1800e6af55e1c877a72e3e0b52621ae4d57c9875
