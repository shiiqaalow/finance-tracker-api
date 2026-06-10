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