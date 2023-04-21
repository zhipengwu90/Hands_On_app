import {Text, View, Alert} from "react-native"; 
import LoginForm from "./LoginForm";
import { useState } from 'react';

function LoginContent({onAuthenticate,tryEnteredEmail}){
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });


  function submitHandler(credentials) {
    let { email, password, type} = credentials;
    email = email.trim();
    password = password.trim();
    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;


    if (
      !emailIsValid ||
      !passwordIsValid
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
      });
      return;
    }
    onAuthenticate({ email, password, type,  });
  }



    return(
      <LoginForm
      onSubmit={submitHandler}
      credentialsInvalid={credentialsInvalid}
      ></LoginForm>
    )
};

export default LoginContent;

