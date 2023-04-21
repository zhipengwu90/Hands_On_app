import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useEffect, useState, useContext } from "react";
import Login from "./pages/Login";
import RequestorRoute from "./pages/RequestorRoute";
import HelperRoute from "./pages/HelperRoute";
import AuthContextProvider, { AuthContext } from "./store/authContext";
import { RootSiblingParent } from 'react-native-root-siblings';
import ItemDataProvider from "./store/dataContext";
import { ItemDataContext } from "./store/dataContext";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoginReq, setIsLoginReq] = useState(false);
  const [isLoginHelp, setIsLoginHelp] = useState(false);

  
  

 

  function Navigation() {
    const authCtx = useContext(AuthContext);
     const isAuthenticated= authCtx.isAuthenticated;


    const loginHandler = (loginType) => {  
      if (loginType === "Helper") {
        setIsLoginHelp(true);
      } else if (loginType === "Requestor") {
        setIsLoginReq(true);

      }
    };

    const logoutHandler = () => {
      setIsLoginReq(false);
      setIsLoginHelp(false);
    };

    return (
      <>
       {!isAuthenticated && <Login onLogin={loginHandler}></Login>}
        {isLoginReq &&isAuthenticated && <RequestorRoute onLogout={logoutHandler} />}
        {isLoginHelp && isAuthenticated &&<HelperRoute onLogout={logoutHandler}  />}
      </>
    );
  }

  return (
    <AuthContextProvider>
      <ItemDataProvider>
       <RootSiblingParent> 
     
      <Navigation />
      </RootSiblingParent>
      </ItemDataProvider>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
