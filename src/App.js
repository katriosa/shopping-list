import React, { useContext } from "react";
import Items from "./components/Items/Items";
import Auth from "./components/Auth";
import { AuthContext } from "./context/auth-contex";

const App = (props) => {
  const authContext = useContext(AuthContext);

  let content = <Auth />;
  if (authContext.isAuth) {
    content = <Items />;
  }
  return content;
};

export default App;
