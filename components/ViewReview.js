import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import FirstButton from "./FirstButton";
import { db } from "../util/firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import Toast from "react-native-root-toast";
import timestampToDate from "../util/timestampToDate";
import { FontAwesome } from "@expo/vector-icons";
const ViewReview = (props) => {
  const { viewUserInfo, taskId } = props;

  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState("");

  async function getComments() {
    try {
      const docRef = doc(
        db,
        "requestData",
        "userList",
        "allUsers",
        viewUserInfo,
        "reviews",
        taskId
      );
      await getDoc(docRef).then((doc) => {
        setName(doc.data().name);
        setReview(doc.data().review);
        setRating(doc.data().rating);
        setDate(timestampToDate(doc.data().date));
      });
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
    getComments();
    return () => {};
  }, []);

  const Rating = () => {
    const star = Number(rating);
    return (
      <View style={{ flexDirection: "row" }}>
        {[...Array(star)].map((_, index) => (
          <FontAwesome key={index} name="star" size={20} color="#ffdd00" />
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <View style={styles.header}>
          <View style={styles.name}>
            <Text style={styles.nameText}>{name}</Text>
            {<Rating />}
          </View>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <View style={styles.reviewBox}>
          <Text style={styles.reviewText}>{review}</Text>
        </View>
        <FirstButton
          style={styles.yesButton}
          buttonText={styles.buttonText}
          onPress={props.onPress}
        >
          Close
        </FirstButton>
      </View>
    </View>
  );
};
export default ViewReview;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "#fff",
    borderColor: "#478adc",
    borderWidth: 2,
    marginVertical: 7,
    marginHorizontal: 25,
    minHeight: 100,
    borderRadius: 15,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#478adc",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  name: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  dateText: {
    color: "#e4d9d9",
    fontSize: 13,
  },
  reviewBox: {
    width: "100%",
    justifyContent: "center",
    padding: 10,
  },
  reviewText: {
    fontSize: 18,
    fontWeight: "500",
    },

  yesButton: {
    backgroundColor: "#398B8C",
    width: "40%",
    height: 40,
    marginVertical: 20,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },

});
