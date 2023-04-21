import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { db } from "../util/firebaseConfig";
import SingleComment from "./SingleComment";
import timestampToDate from "../util/timestampToDate";
import {
  collection,
  onSnapshot,

} from "firebase/firestore";
import Toast from "react-native-root-toast";

function Comments(props) {
  const { viewUserUid } = props;
  const [comments, setComments] = useState([]);

  async function getComments() {
    try {
      const collectionRef = collection(
        db,
        "requestData",
        "userList",
        "allUsers",
        viewUserUid,
        "reviews"
      );
      const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
  
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          review: doc.data().review,
          rating: doc.data().rating,
          date: timestampToDate(doc.data().date), 
        }));
        setComments(data);
      });

      return unsubscribe;
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

  useEffect(() => {
    let total = 0;
    const length = comments.length;
    if (length === 0) return;
    comments.forEach((comment) => {
      total += comment.rating;
    });
    props.score(total / length);
    // setScore(total / comments.length);
  }, [comments]);

  function renderComment(itemData) {
    return (
      <SingleComment
        name={itemData.item.name}
        review={itemData.item.review}
        rating={itemData.item.rating}
        date={itemData.item.date}
      />
    );
  }

  return (
    <View style={styles.container}>
      {comments.length ? (
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderComment}
          style={styles.commentsList}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 10}} 
        />
      ) : (
        <Text style={{ textAlign: "center", fontSize: 20, marginTop: 20 }}>
          There is no comments.
        </Text>
      )}
    </View>
  );
}

export default Comments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentsList: {
    flex: 1,
  },
});
