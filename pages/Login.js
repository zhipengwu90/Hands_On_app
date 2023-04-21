import { StyleSheet, useWindowDimensions, Modal, Alert } from "react-native";
import { AuthContext } from "../store/authContext";
import React, { useState, useContext } from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import { login } from "../util/auth";
import LoginContent from "../components/LoginAuth/LoginContent";
import Toast from "react-native-root-toast";
import useNotification from "../util/useNotification";
import { collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../util/firebaseConfig";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function Register(props) {
  const { height, width } = useWindowDimensions();
  // const [pushToken, setPushToken] = useState();
  const authCtx = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const pushToken = useNotification();
  // console.log(pushToken);

  async function loginHandler({ email, password, type }) {
    setIsAuthenticating(true);
    try {
      const respondData = await login(email, password);
      authCtx.setRespondData(respondData);
      authCtx.authenticate(respondData.idToken);

      props.onLogin(type);
      setIsAuthenticating(false);

      const uid = respondData.localId;
      const collectionRef = doc(
        collection(doc(db, "requestData", "userList"), "allUsers"),
        uid
      );
      if (pushToken) {
        await updateDoc(collectionRef, {
          pushToken: pushToken.data,
        });
      }
      Toast.show(
        `${respondData.displayName}, Good to have you back! Let's get started.`,
        {
          duration: 1800,
          position: 60,
          backgroundColor: "#c80000",
          shadow: true,
          animation: true,
          opacity: 1,
        }
      );
    } catch (err) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in" />;
  }
  return (
    <KeyboardAwareScrollView enableOnAndroid={true} style={[styles.container]}>
      <LoginContent onAuthenticate={loginHandler}></LoginContent>
    </KeyboardAwareScrollView>
  );
}

export default Register;

const styles = StyleSheet.create({});
