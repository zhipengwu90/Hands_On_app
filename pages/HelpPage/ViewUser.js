import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  FlatList,
} from "react-native";
import { AuthContext } from "../../store/authContext";
import { useContext, useEffect, useState } from "react";
import FirstButton from "../../components/FirstButton";
import Toast from "react-native-root-toast";
import { Ionicons } from "@expo/vector-icons";
import ViewButton from "../../components/ViewButton";
import ViewTasks from "../../components/ViewTasks";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Comments from "../../components/Comments";
import { db } from "../../util/firebaseConfig";
import { FontAwesome } from "@expo/vector-icons";
import {
  collection,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  where,
} from "firebase/firestore";

function ViewUser(props) {
  const authCtx = useContext(AuthContext);
  const viewUserUid = props.viewUserInfo;
  const [userInfo, setUserInfo] = useState([]);
  const [taskListLength, setTaskListLength] = useState();
  const TopTab = createMaterialTopTabNavigator();
  const [score, setScore] = useState();

  async function getUserInfo() {
    try {
      const docRef = doc(
        collection(doc(db, "requestData", "userList"), "allUsers"),
        viewUserUid
      );

      const docSnap = await getDoc(docRef);
      setUserInfo(docSnap.data());
      const collectionRef = collection(
        doc(db, "requestData", "taskList"),
        "allTasks"
      );
      const unsubscribe = onSnapshot(
        query(
          collectionRef,
          where("uid", "==", viewUserUid),
          orderBy("date", "desc")
        )
        // (querySnapshot) => {
        //   const data = querySnapshot.docs;
        //   setTaskListLength(data.length);
        // }
      );

      return getDoc;
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
      <View style={styles.headerbox}>
        <View style={styles.bannerContainer}>
          <ViewButton style={styles.backClose} onPress={props.onPress}>
            <Ionicons name="close-circle-outline" size={35} color="white" />
          </ViewButton>
          <View style={styles.profileBox}>
            <Image
              source={require("../../assets/img/profile.png")}
              style={styles.userProfile}
            />
            <Text style={styles.userName}>{userInfo.name}</Text>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.taskBox}>
              <Text style={styles.number}>{taskListLength}</Text>
              <Text style={styles.infoText}>Total Tasks</Text>
            </View>
            <View style={styles.rateBox}>
              <View style={styles.scoreBox}>
                <FontAwesome name="star" size={18} color="#ffdd00" />
                <Text style={styles.number}>
                  {score ? `${Number(score).toFixed(1)}/5.0` : "N/A"}
                </Text>
              </View>
              <Text style={styles.infoText}>Rating</Text>
            </View>
          </View>
        </View>
      </View>
      <NavigationContainer independent={true}>
        <TopTab.Navigator>
          <TopTab.Screen name="Tasks">
            {(props) => (
              <ViewTasks
                {...props}
                taskListLength={(el) => setTaskListLength(el)}
                viewUserUid={viewUserUid}
              />
            )}
          </TopTab.Screen>
          <TopTab.Screen name="Comments">
            {(props) => (
              <Comments
                {...props}
                score={(el) => setScore(el)}
                viewUserUid={viewUserUid}
              />
            )}
          </TopTab.Screen>
        </TopTab.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default ViewUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerbox: {
    backgroundColor: "#D35C5D",
  },
  backClose: {
    position: "absolute",
    top: 0,
    right: 15,
    zIndex: 100,
  },

  bannerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? 7 : 55,
    marginBottom: 10,
  },
  bannerImg: {
    width: "100%",
    position: "absolute",
  },
  userProfile: {

    alignSelf: "center",
    width: Platform.OS === "android" ? 90 : 80,
    height: Platform.OS === "android" ? 90 : 80,
  },

  userName: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  infoBox: {
    marginTop: Platform.OS === "android" ? 12 : 18,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  taskBox: {
    alignItems: "center",
    width: "50%",
    borderEndWidth: 2,
    borderEndColor: "#ffffffb4",
  },
  rateBox: {
    alignItems: "center",
    width: "50%",
  },

  scoreBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    fontSize: 20,
    fontWeight: Platform.OS === "android" ? "800" : "700",
    lineHeight: 45,
    color: "#ffffff",
  },
  infoText: {
    color: "#36e2e2",
    fontSize: 15,
    fontWeight: "700",
  },
  TaskListTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginVertical: 5,
  },
});
