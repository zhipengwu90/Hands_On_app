import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Animated,
  TextInput,
} from "react-native";
import { AuthContext } from "../../store/authContext";
import { useContext, useEffect, useState } from "react";
import FirstButton from "../../components/FirstButton";
import Toast from "react-native-root-toast";
import { Ionicons } from "@expo/vector-icons";
import ViewButton from "../../components/ViewButton";
import { MaterialIcons } from "@expo/vector-icons";

import { db } from "../../util/firebaseConfig";
import { collection, getDoc, doc, setDoc, updateDoc } from "firebase/firestore";

function RateUser(props) {
  const authCtx = useContext(AuthContext);
  const viewUserUid = props.viewUserInfo;
  const [userInfo, setUserInfo] = useState([]);
  const [starRating, setStarRating] = useState(null);
  const [review, setReview] = useState("");
  const [reviewError, setReviewError] = useState(false);
  const [isError, setError] = useState(false);
  const postUserUid = props.postUserUid;
  const helperId = authCtx.respondData.localId;
  const helperName = authCtx.respondData.displayName;
  // const [reviewData, setReviewData] = useState({});
  const taskId = props.taskId;

  let currentTime = new Date();

  const animatedButtonScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  const updateInputValueHandler = (inputValue) => {
    setReview(inputValue);
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

  const submitReview = async (reviewData) => {
    try {
      // const docRef = doc(collection(doc(collection(doc(db, "requestData", "userList"), "allUsers"),postUserUid), "reviews"), taskId);

      const docRef = doc(
        db,
        "requestData",
        "userList",
        "allUsers",
        postUserUid,
        "reviews",
        taskId
      );
      const taskRef = doc(db, "requestData", "taskList", "allTasks", taskId);

      const docSnap = await setDoc(docRef, reviewData);
      const taskUpdated = await updateDoc(
        taskRef,
        { isHelperReviewed: true },
        { merge: true }
      );

      props.onPress();
      Toast.show("Your review has been successfully submitted.", toastYes);
    } catch (err) {
      console.log(err);
      Toast.show("An error has occurred, please try again", toastNo);
    }
  };

  const submitHandler = () => {
    if (starRating === null) {
      setError(true);
    } else if (review === "") {
      setReviewError(true);
    } else {
      const reviewData = {
        rating: starRating,
        review: review,
        date: currentTime,
        isReviewed: true,
        uid: helperId,
        name: helperName,
      };

      submitReview(reviewData);
      setError(false);
      setReviewError(false);
      
    }
  };

  async function getUserInfo() {
    try {
      const docRef = doc(
        collection(doc(db, "requestData", "userList"), "allUsers"),
        viewUserUid
      );
      const docSnap = await getDoc(docRef);
      setUserInfo(docSnap.data());
    } catch (err) {
      console.log(err);
      Toast.show("An error has occurred, please try again", {
        duration: 1300,
        position: Toast.positions.CENTER,
        backgroundColor: "#680808",
        shadow: true,
        animation: true,
        opacity: 1,
      });
    }
  }

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <ViewButton style={styles.backArrow} onPress={props.onPress}>
        <Ionicons name="close-circle-outline" size={35} color="#ffffff" />
      </ViewButton>
      <Image
        source={require("../../assets/img/reviewBgHe.png")}
        style={styles.bannerImg}
      />
      <View style={styles.profileBox}>
        <Image
          source={require("../../assets/img/profile.png")}
          style={styles.userProfile}
        />
        <Text style={styles.userName}>{userInfo.name}</Text>
      </View>
      <View style={styles.ratingBox}>
        <Text style={styles.heading}>
          {starRating ? `${starRating}/5` : "Tap to Rate"}
        </Text>
        <View style={styles.stars}>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => setStarRating(1)}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating >= 1 ? "star" : "star-border"}
                size={32}
                style={
                  starRating >= 1 ? styles.starSelected : styles.starUnselected
                }
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => setStarRating(2)}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating >= 2 ? "star" : "star-border"}
                size={32}
                style={
                  starRating >= 2 ? styles.starSelected : styles.starUnselected
                }
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => setStarRating(3)}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating >= 3 ? "star" : "star-border"}
                size={32}
                style={
                  starRating >= 3 ? styles.starSelected : styles.starUnselected
                }
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => setStarRating(4)}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating >= 4 ? "star" : "star-border"}
                size={32}
                style={
                  starRating >= 4 ? styles.starSelected : styles.starUnselected
                }
              />
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => setStarRating(5)}
          >
            <Animated.View style={animatedScaleStyle}>
              <MaterialIcons
                name={starRating >= 5 ? "star" : "star-border"}
                size={32}
                style={
                  starRating >= 5 ? styles.starSelected : styles.starUnselected
                }
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
        {isError && <Text style={styles.errorText}>Please rate the user</Text>}
      </View>
      <View style={styles.reviewBox}>
        <TextInput
          style={styles.reviewInput}
          placeholder="Write your review here"
          multiline={true}
          numberOfLines={4}
          value={review}
          onChangeText={updateInputValueHandler}
          maxLength={300}
        />
        {reviewError && (
          <Text style={styles.errorText}>Please leave the review</Text>
        )}
      </View>
      <View style={styles.buttonBox}>
        <FirstButton
          style={styles.submit}
          buttonText={styles.submitText}
          onPress={submitHandler}
        >
          Submit
        </FirstButton>
      </View>
    </View>
  );
}

export default RateUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backArrow: {
    position: "absolute",

    top: 50,
    right: 15,
    zIndex: 100,
  },
  bannerImg: {
    width: "100%",
    position: "absolute",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 10,
  },

  userProfile: {
    alignSelf: "center",
    width: Platform.OS === "android" ? 100 : 90,
    height: Platform.OS === "android" ? 100 : 90,
  },
  profileBox: {
    marginTop: 120,
  },
  userName: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  ratingBox: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#008c8c",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  starUnselected: {
    color: "#aaa",
  },
  starSelected: {
    color: "#ffb300",
  },
  reviewBox: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  reviewInput: {
    borderWidth: 1,
    fontSize: 16,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    height: 180,
    width: "100%",
    textAlignVertical: "top",
  },
  buttonBox: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  submit: {
    backgroundColor: "#008c8c",
    paddingHorizontal: 5,
    borderRadius: 50,
  },
  submitText: {
    color: "white",
    fontWeight: "500",
  },
  errorText: {
    color: "#d40202",
    fontWeight: "600",
    fontSize: 15,
    alignSelf: "center",
  },
});
