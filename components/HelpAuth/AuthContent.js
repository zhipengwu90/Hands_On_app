import { View, Text, Alert } from "react-native";
import AuthForm from "./AuthForm";
import { useState } from "react";

function AuthContent({ onAuthenticate, onLogin }) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    name: false,
    confirmPassword: false,
  });
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  function submitHandler(credentials) {
    
    const emailCheckHandler = (email) => {
      return String(email)
        .match(emailRegex)}


    let { email, name, password, confirmPassword } = credentials;

    email = email.trim().toLowerCase();
    password = password.trim();
    name = name.trim();

    const nameIsValid = name.length > 0;
    const emailIsValid = !!emailCheckHandler(email);
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;
  //  const test = !!emailCheckHandler(email);
  //     console.log(test);
  

 

    if (
      !emailIsValid ||
      !passwordIsValid ||
      !nameIsValid ||
      !passwordsAreEqual
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        name: !name,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ name, email, password });
  }

  return (
    <AuthForm
      // isLogin={isLogin}
      onSubmit={submitHandler}
      credentialsInvalid={credentialsInvalid}
      onLogin={onLogin}
    />
  );
}

export default AuthContent;
