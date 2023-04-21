import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from "react-native";
import { useState, useCallback, useRef } from "react";
import ViewButton from "../../components/ViewButton";
import GlobalStyles from "../../constants/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import NewTaskForm from "../../components/NewTaskForm";
import { db } from "../../util/firebaseConfig";
import { collection, addDoc, doc } from "firebase/firestore";
import { useContext } from "react";

import Toast from "react-native-root-toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function NewTask(props) {
  const onSubmitHandler = async (data) => {
    const collectionRef = collection(
      doc(db, "requestData", "taskList"),
      "allTasks"
    );
    try {
      const docRef = await addDoc(collectionRef, data);

      props.onPress();
      Toast.show("Your new task has been updated successfully.", {
        duration: 1800,
        position: Toast.positions.CENTER,
        backgroundColor: "#08685e",
        shadow: true,
        animation: true,
        opacity: 1,
      });
    } catch (e) {
      props.onPress();
      Toast.show("An error has occurred, please try again", {
        duration: 1300,
        position: Toast.positions.CENTER,
        backgroundColor: "#680808",
        shadow: true,
        animation: true,
        opacity: 1,
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={155}
      enableOnAndroid={true}
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <ViewButton style={styles.backClose} onPress={props.onPress}>
            <Ionicons name="close-circle-outline" size={35} color="#be0707" />
          </ViewButton>
          <View style={styles.headerTextBox}>
            <Text style={styles.headerText}>New Task</Text>
          </View>
        </View>
        <NewTaskForm onClick={props.onPress} onSubmit={onSubmitHandler} />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

export default NewTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: Platform.OS === "ios" ? 10 : 0,
  },
  backClose: {
    position: "absolute",

    right: 20,
    zIndex: 100,
  },
  header: {
    flexDirection: "row",

    marginTop: 40,
  },
  headerText: {
    fontSize: 30,
    color: "#008c8c",
    fontWeight: "600",
  },
  headerTextBox: {
    width: "100%",
    alignItems: "center",
  },

  buttonBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  submit: {
    marginTop: Platform.OS === "ios" ? 20 : 30,
    marginBottom: 10,
    backgroundColor: "#008c8c",
    paddingVertical: 2,
    borderRadius: 50,
    width: "60%",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  submitText: {
    color: "white",
    fontWeight: "600",
  },
  description: {
    minHeight: 150,
  },
  cancel: {
    marginTop: Platform.OS === "ios" ? 20 : 30,
    marginBottom: 40,
    backgroundColor: "#D35D5D",
    paddingVertical: 2,
    borderRadius: 50,
    width: "60%",
    shadowColor: "#cd2121",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  cancelText: {
    color: "white",
    fontWeight: "600",
  },
});
