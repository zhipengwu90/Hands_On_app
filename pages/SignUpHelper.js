import {
  StyleSheet,
  Text,
  SafeAreaView,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import LoadingOverlay from "../components/LoadingOverlay";
import GlobalStyles from "../constants/GlobalStyles";
import { createUser } from "../util/auth";
import React, { useState } from "react";
import Toast from "react-native-root-toast";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../util/firebaseConfig";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AuthContent from "../components/HelpAuth/AuthContent";

function SignUpHelper({ onClose, onSignup }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  function signupHandler({ name, email, password }) {
    setIsAuthenticating(true);

    createUser(name, email, password)
      .then((respondData) => {
        setIsAuthenticating(false);
        onSignup({
          email: email,
          password: password,
          type: "Helper",
        });
        return respondData;
      })
      .then((respondData) => {
        Toast.show(
          `${name}, you're officially a member of Hands On family, Please log in to your account`,
          {
            duration: 2500,
            position: 60,
            backgroundColor: "#07897c",
            shadow: true,
            animation: true,
            opacity: 1,
          }
        );
        const { email: userEmail, localId: uid } = respondData;

        const data = {
          email: userEmail,
          name: name,
          localId: uid,
          type: "Helper",
        };
        try {
          const collectionRef = doc(
            collection(doc(db, "requestData", "userList"), "allUsers"),
            uid
          );

          const docRef = setDoc(collectionRef, data);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          Alert.alert(
            "Authentication failed",
            `An account with Email ${email} already exists`
          );
        } else {
          Alert.alert(
            "Authentication failed",
            "Could not create user, please check your input and try again"
          );
        }

        setIsAuthenticating(false);
      });
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating the user..." />;
  }

  return (
    <KeyboardAwareScrollView
    extraScrollHeight={30}
      enableOnAndroid={true}
      style={[styles.container]}
    >
      <ScrollView  style={styles.formBox} keyboardShouldPersistTaps="handled">
        <AuthContent
          onLogin={onClose}
          onAuthenticate={signupHandler}
          style= {styles.formBox}
        ></AuthContent>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

export default SignUpHelper;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D35D5D",
    flex: 1,
  },
  formBox: {
    paddingTop: Platform.OS === "ios" ? 30 : 10,
    paddingBottom: 20,
  },

});
