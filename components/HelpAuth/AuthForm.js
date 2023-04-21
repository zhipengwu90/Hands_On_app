import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import TextButton from "../TextButton";
import FirstButton from "../FirstButton";
import { Ionicons } from "@expo/vector-icons";
import ViewButton from "../ViewButton";
import Input from "./Input";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

function AuthForm({ onSubmit, credentialsInvalid, onLogin }) {
  const [isSelected, setSelection] = useState(false);
  const [isError, setError] = useState(false);

  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    name: nameIsValid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "name":
        setEnteredName(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}  accessible={false}>
    <View>
    <ViewButton style={styles.backClose} onPress={onLogin}>
          <Ionicons name="close-circle-outline" size={35} color="white" />
        </ViewButton>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Create A</Text>
        <Text style={styles.title}>Helper Account</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          style={styles.inputContent}
          iconName="person-outline"
          iconColor="white"
          onChangeText={updateInputValueHandler.bind(this, "name")}
          value={enteredName}
          isInvalid={nameIsValid}
          textInputConfig={{
            placeholder: "name",
            autoCorrect: false,
            color: "white",
            placeholderTextColor: "#f7f3f3a3",
          }}
        />
        {nameIsValid && (
          <Text style={styles.errorText}>
            name cannot be empty.
          </Text>
        )}

        <Input
          style={styles.inputContent}
          iconName="mail-open-outline"
          value={enteredEmail}
          iconColor="white"
          onChangeText={updateInputValueHandler.bind(this, "email")}
          isInvalid={emailIsInvalid}
          textInputConfig={{
            placeholder: "Email",
            placeholderTextColor: "#f7f3f3a3",
            keyboardType: "email-address",
            autoCorrect: false,
            color: "white",
          }}
        />
        {emailIsInvalid && (
          <Text style={styles.errorText}>
            Please enter a valid email address.
          </Text>
        )}
        <Input
          style={styles.inputContent}
          value={enteredPassword}
          iconName="lock-closed-outline"
          iconColor="white"
          onChangeText={updateInputValueHandler.bind(this, "password")}
          isInvalid={passwordIsInvalid}
          textInputConfig={{
            placeholder: "Password",
            secureTextEntry: true,
            color: "white",
            placeholderTextColor: "#f7f3f3a3",
          }}
        />
        {passwordIsInvalid && (
          <Text style={styles.errorText}>
            Password must be more than 7 characters!
          </Text>
        )}
        <Input
          style={styles.inputContent}
          onChangeText={updateInputValueHandler.bind(this, "confirmPassword")}
          value={enteredConfirmPassword}
          iconName="lock-closed-outline"
          iconColor="white"
          isInvalid={passwordsDontMatch}
          textInputConfig={{
            placeholder: "Confirm Password",
            secureTextEntry: true,
            color: "white",
            placeholderTextColor: "#f7f3f3a3",
          }}
        />
        {passwordsDontMatch && (
          <Text style={styles.errorText}>Password doesn't match</Text>
        )}
      </View>
      <View style={styles.checkBox}>
        <BouncyCheckbox
          size={20}
          fillColor="#000000"
          unfillColor="#FFFFFF"
          text="By signing up you agree to the terms of service and privacy policy"
          textStyle={{
            textDecorationLine: "none",
            color: "white",
            fontSize: 14,
          }}
          iconStyle={{ borderColor: "#000000", borderRadius: 0 }}
          innerIconStyle={{ borderWidth: 1, borderRadius: 0 }}
          onPress={() => {
            setSelection(!isSelected);
            setError(false);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        {isSelected && (
          <FirstButton
            onPress={submitHandler}
            style={styles.signUpButton}
            buttonText={styles.signUpText}
          >
            Sign Up
          </FirstButton>
        )}

        {!isSelected && (
          <FirstButton
            onPress={() => {
              setError(true);
            }}
            style={styles.disabledSignUpButton}
            buttonText={styles.disabledText}
          >
            Sign Up
          </FirstButton>
        )}
        {isError && (
          <Text style={styles.errorText}>
            Please check the box if you want to proceed.
          </Text>
        )}
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.haveAcountText}>Already have account?</Text>
        <TextButton
          style={styles.loginButton}
          buttonText={styles.loginText}
          onPress={onLogin}
        >
          Login
        </TextButton>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#008c8c",
  },
  backClose: {
    position: "absolute",

    top: 15,
    right: 18,
    zIndex: 100,
  },

  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "700",
  },
  titleContainer: {
    marginTop: 50,
    marginLeft: 30,
  },
  inputContainer: {
    marginTop: 50,
    alignContent: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  inputContent: {
    // paddingVertical: 5,
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,

    marginTop: 10,
  },
  checkBox: {
    width: "100%",
    paddingHorizontal: 35,
  },
  buttonContainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  signUpButton: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#f8f8f8",
    width: 270,
    backgroundColor: "#fbfbfb",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },

  disabledSignUpButton: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#d2c7c7",
    width: 270,
    backgroundColor: "#d2c7c7",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  signUpText: {
    color: "#008c8c",
    fontWeight: "700",
    fontSize: 20,
  },
  disabledText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 20,
  },

  errorText: {
    color: "#01ae80",
    fontWeight: "600",
    fontSize: 15,
    alignSelf: "center",
  },
  loginContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  haveAcountText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
    paddingHorizontal: 6,
  },
  loginText: {
    color: "#01ae80",
    textDecorationLine: "underline",
    fontSize: 20,
    fontWeight: "600",
  },
});
