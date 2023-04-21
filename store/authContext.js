import { createContext, useState } from "react";
import { collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../util/firebaseConfig";
export const AuthContext = createContext({
  respondData: [],
  setRespondData: () => {},
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  const [data, setData] = useState([]);

  function authenticateData(respond) {
    setData(respond);
  }

  function authenticate(token) {
    setAuthToken(token);
  }
  async function logout(uid) {
    const collectionRef = doc(
      collection(doc(db, "requestData", "userList"), "allUsers"),
      uid
    );
    await updateDoc(collectionRef, {
      pushToken: "",
    });

    setAuthToken(null);
  }

  const value = {
    respondData: data,
    setRespondData: authenticateData,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
