import { View, Text, Image, StyleSheet, Platform, Alert } from "react-native";
import { AuthContext } from "../../store/authContext";
import { useContext, useState } from "react";
import FirstButton from "../../components/FirstButton";
import Toast from "react-native-root-toast";
import { FontAwesome } from "@expo/vector-icons";
import Comments from "../../components/Comments";
import { MaterialIcons } from "@expo/vector-icons";
import ViewButton from "../../components/ViewButton";
import { ItemDataContext } from "../../store/dataContext";
function Profile({ route }) {
  const authCtx = useContext(AuthContext);
  const [score, setScore] = useState();
  const displayName = authCtx.respondData.displayName;
  const onLogout = route.params.onLogout;
  const uid = authCtx.respondData.localId;
  const dataCtx = useContext(ItemDataContext);
  let taskData = dataCtx.itemData.filter((item) => item.isCompleted === true);
  const totalTasks = taskData.length;

  const logoutHandler = () => {
    
    authCtx.logout(uid);

    Toast.show("You have successfully logged out", {
      duration: 1800,
      position: 60,
      backgroundColor: "#c80000",
      shadow: true,
      animation: true,
      opacity: 1,
    });
  };

  const logoutConfirm = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            logoutHandler();
            onLogout();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <ViewButton style={styles.exitButton} onPress={logoutConfirm}>
          <MaterialIcons name="exit-to-app" size={24} color="black" />
        </ViewButton>
        <View style={styles.bannerContainer}>
          <View style={styles.profileBox}>
            <Image
              source={require("../../assets/img/profile.png")}
              style={styles.userProfile}
            />
            <Text style={styles.userName}>{displayName}</Text>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.taskBox}>
              <Text style={styles.number}>{totalTasks}</Text>
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
      <View style={styles.commentBox}>
        <Comments viewUserUid={uid} score={(el) => setScore(el)} />
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBox: {
    backgroundColor: "#D35C5D"
  },

  bannerContainer: {
    justifyContent: "center",
    alignItems: "center",
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
    width: Platform.OS === "android" ? 90 : 80,
    height: Platform.OS === "android" ? 90 : 80,
  },
  profileBox: {
    marginTop: Platform.OS === "android" ? 30 : 50,
  },
  userName: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  infoBox: {
    marginTop: Platform.OS === "android" ? 20 : 20,
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
    justifyContent: "space-around",
  },
  taskBox: {
    alignItems: "center",
    width: "50%",
    borderEndWidth: 2,
    borderEndColor: "#ffffffff",
  },
  rateBox: {
    alignItems: "center",
    width: "50%",
  },
  star: {
    width: 27,
    height: 27,
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
    color: "#63d7d9",
    fontSize: 15,
    fontWeight: "700",
  },
  commentBox: {
    flex: 1,
  },
  exitButton: {
    position: "absolute",
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 200,
  },
});
