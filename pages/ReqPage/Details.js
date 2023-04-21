import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Modal,
  Dimensions,
  Alert,
} from "react-native";
import TaskIconFinder from "../../components/TaskIconFinder";
import { Entypo } from "@expo/vector-icons";
import FirstButton from "../../components/FirstButton.js";
import ViewButton from "../../components/ViewButton.js";
import React, { useState, useContext } from "react";
import ModifiedTask from "./ModifiedTask.js";
import { ItemDataContext } from "../../store/dataContext";
import { db } from "../../util/firebaseConfig";
import { collection, updateDoc, doc } from "firebase/firestore";
import Toast from "react-native-root-toast";
import { Ionicons } from "@expo/vector-icons";

import ViewUser from "./ViewUser";
import RateUser from "./RateUser";
import ViewReview from "../../components/ViewReview";
import DetailInfo from "../../components/ReqComp/DetailInfo";
const windowHeight = Dimensions.get("window").height;

function Details({ route, navigation }) {
  const dataCtx = useContext(ItemDataContext);

  const { id } = route.params;
  const [rateUser, setRateUser] = useState(false);
  const [viewUser, setViewUser] = useState(false);
  const selectedTask = dataCtx.itemData.find((item) => item.id === id);
  const [update, setUpdate] = React.useState(false);
  const isPosted = selectedTask.status === "Posted";
  const isPending = selectedTask.status === "Pending";
  const isAccepted = selectedTask.status === "Accepted";
  const isCancelled = selectedTask.status === "Cancelled";
  const isCompleted = selectedTask.isCompleted;
  const isReviewed = selectedTask.isReviewed;
  const helperId = selectedTask.helperId;
  const helperName = selectedTask.helperName;
  const [viewReview, setViewReview] = useState(false);
  const collectionRef = doc(
    collection(doc(db, "requestData", "taskList"), "allTasks"),
    id
  );

  const status = () => {
    if (isCancelled) {
      return styles.taskStatusCancelled;
    } else if (isPending) {
      return styles.taskStatusPending;
    } else if (isAccepted) {
      return styles.taskStatusAccepted;
    } else if (isPosted) {
      return styles.taskStatus;
    } else {
      return styles.taskStatus;
    }
  };

  const toastYes = {
    duration: 1300,
    position: Toast.positions.CENTER,
    backgroundColor: "#08685e",
    shadow: true,
    animation: true,
    opacity: 1,
  };

  const toastNo = {
    duration: 2000,
    position: Toast.positions.CENTER,
    backgroundColor: "#ab0808",
    shadow: true,
    animation: true,

    opacity: 1,
  };

  const completeConfirm = () => {
    Alert.alert(
      "Task Completed",
      `Can you confirm that the task has been completed?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Confirm", onPress: () => completeHandler() },
      ],
      { cancelable: false }
    );
  };

  const terminateConfirm = () => {
    Alert.alert(
      "Terminate task",
      `Could you please confirm if you want to terminate the task?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Confirm", onPress: () => terminateHandler() },
      ],
      { cancelable: false }
    );
  };

  const completeHandler = async () => {
    try {
      await updateDoc(collectionRef, {
        status: "Completed",
        isCompleted: true,
      }); // update the document with new data

      Toast.show("Your task has been completed successfully.", toastYes);
    } catch (e) {
      Toast.show("An error has occurred, please try again", toastNo);
    }
  };

  const terminateHandler = async () => {
    try {
      await updateDoc(collectionRef, {
        status: "Posted",
        isCompleted: false,
        isTerminated: true,
      }); // update the document with new data

      Toast.show("Your task has been terminated successfully.", toastYes);
    } catch (e) {
      Toast.show("An error has occurred, please try again", toastNo);
    }
  };

  const approveConfirm = () => {
    Alert.alert(
      "Approve Task",
      `Are you sure you want to accept ${helperName}?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Approve", onPress: () => approveHandler() },
      ],
      { cancelable: false }
    );
  };

  const rejectConfirm = () => {
    Alert.alert(
      "Reject Task",
      `Are you sure you want to reject ${helperName}?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Reject", onPress: () => rejectHandler() },
      ],
      { cancelable: false }
    );
  };

  const approveHandler = async () => {
    try {
      await updateDoc(collectionRef, {
        status: "Accepted",
      }); // update the document with new data
      // navigation.navigate("All");
      Toast.show("Your task has been approved successfully.", toastYes);
    } catch (e) {
      Toast.show("An error has occurred, please try again", toastNo);
    }
  };

  const rejectHandler = async () => {
    try {
      await updateDoc(collectionRef, {
        status: "Posted",
      
        isRejected: true,
      }); // update the document with new data
      // navigation.navigate("All");
      Toast.show("Your task has been reject.", toastYes);
    } catch (e) {
      Toast.show("An error has occurred, please try again", toastNo);
    }
  };

  const cancelHandler = async () => {
    try {
      await updateDoc(collectionRef, {
        status: "Cancelled",
        isCompleted: false,
      }); // update the document with new data
      // navigation.navigate("All");
      Toast.show("Your task has been canceled successfully.", toastYes);
    } catch (e) {
      Toast.show("An error has occurred, please try again", toastNo);
    }
  };

  const cancelConfirm = () => {
    Alert.alert(
      "Cancel Task",
      "Are you sure you want to cancel this task?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => cancelHandler() },
      ],
      { cancelable: false }
    );
  };

  const HelperButton = () => {
    return (
      <ViewButton style={styles.nameButton} onPress={() => setViewUser(true)}>
        <View style={styles.nameButtonContainer}>
          <Ionicons name="person-outline" size={20} color="black" />
          <Text style={styles.nameButtonText}>{helperName}</Text>
        </View>
      </ViewButton>
    );
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Modal animationType="fade" transparent={true} visible={viewReview}>
        <ViewReview
          onPress={() => setViewReview(false)}
          viewUserInfo={helperId}
          taskId={id}
        />
      </Modal>
      <Modal animationType="slide" transparent={false} visible={update}>
        <ModifiedTask
          onPress={() => setUpdate(false)}
          taskData={selectedTask}
        />
      </Modal>
      <Modal animationType="slide" transparent={false} visible={viewUser}>
        <ViewUser viewUserInfo={helperId} onPress={() => setViewUser(false)} />
      </Modal>
      <Modal animationType="slide" transparent={false} visible={rateUser}>
        <RateUser
          viewUserInfo={helperId}
          taskId={id}
          onPress={() => setRateUser(false)}
        />
      </Modal>
      <View style={styles.container}>
        <View style={styles.topTitle}>
          <Image
            source={TaskIconFinder(selectedTask.taskType)}
            style={styles.taskIcon}
          />
          <View style={styles.topTitleInner}>
            <Text style={styles.date}>{selectedTask.date}</Text>
            <Text style={styles.title}>{selectedTask.title}</Text>
            <Text style={status()}>⦿ {selectedTask.status}</Text>
          </View>
          {isPosted && (
            <ViewButton onPress={() => setUpdate(true)}>
              <Entypo name="new-message" size={40} color="#008c8c" />
            </ViewButton>
          )}
        </View>
        <View style={styles.taskDetailsBox}>
          <DetailInfo selectedTask={selectedTask} />
        </View>
        {isPosted && (
          <FirstButton
            style={styles.cancelButton}
            buttonText={styles.buttonText}
            onPress={cancelConfirm}
          >
            Cancel Task
          </FirstButton>
        )}
        {isAccepted && (
          <View>
            <HelperButton />
            <Text style={styles.nameButtonSubText}>
              is helping you with this task.
            </Text>
            <View style={styles.yesOrNoBox}>
              <FirstButton
                style={styles.noButton}
                buttonText={styles.buttonText}
                onPress={terminateConfirm}
              >
                Terminate
              </FirstButton>
              <FirstButton
                style={styles.yesButton}
                buttonText={styles.buttonText}
                onPress={completeConfirm}
              >
                Complete
              </FirstButton>
            </View>
          </View>
        )}
        {isPending && (
          <View style={styles.questionBox}>
            <HelperButton />
            <Text style={styles.nameButtonSubText}>
              would like to help you with this task.
            </Text>
            <View style={styles.yesOrNoBox}>
              <FirstButton
                style={styles.yesButton}
                buttonText={styles.buttonText}
                onPress={approveConfirm}
              >
                Approve
              </FirstButton>
              <FirstButton
                style={styles.noButton}
                buttonText={styles.buttonText}
                onPress={rejectConfirm}
              >
                Reject
              </FirstButton>
            </View>
          </View>
        )}

        {isCompleted && (
          <View>
            <HelperButton />
            <Text style={styles.nameButtonSubText}>
              completed this task for you.
            </Text>
            {isReviewed ? (
              <FirstButton
                style={styles.rateButton}
                buttonText={styles.rateText}
                onPress={() => setViewReview(true)}
              >
                See your review
              </FirstButton>
            ) : (
              <FirstButton
                style={styles.rateButton}
                onPress={() => setRateUser(true)}
                buttonText={styles.rateText}
              >
                Please rate the user
              </FirstButton>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: windowHeight * 0.75,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  taskIcon: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  topTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topTitleInner: {
    flex: 1,
    flexDirection: "column",
    height: 80,
    justifyContent: "space-between",
  },
  date: {
    fontSize: 13,
    color: "#808080",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskStatus: {
    color: "#008c8c",
    fontWeight: "bold",
  },
  taskStatusPending: {
    color: "#ff8c00",
    fontWeight: "bold",
  },
  taskStatusCancelled: {
    color: "#a10000",
    fontWeight: "bold",
  },
  taskStatusAccepted: {
    color: "#000000",
    fontWeight: "bold",
  },
  taskDetailsBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopColor: "#b6afaf",
    borderTopWidth: 1,
    marginTop: 10,
  },

  cancelButton: {
    backgroundColor: "#D35D5D",
    width: "50%",
    height: 45,
    marginTop: 30,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  questionBox: {
    alignItems: "center",
  },
  nameButtonSubText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#f16767",
    marginTop: 5,
    textAlign: "center",
  },
  nameButtonContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#398b8c70",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },

  nameButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  yesOrNoBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 10,
  },

  yesButton: {
    backgroundColor: "#398B8C",
    width: "40%",
    height: 40,
    marginTop: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  noButton: {
    backgroundColor: "#D35D5D",
    width: "40%",
    height: 40,
    marginTop: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  nameButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  rateButton: {
    backgroundColor: "#D35D5D",
    marginTop: 30,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  rateText: {
    padding: 5,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});
