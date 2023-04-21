import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons';
const NotiCard = ({ message, isRead }) => {
  return (
    <View style={styles.container}>
       {isRead?"": <Octicons style={styles.dot} name="dot-fill" size={24} color="red" />}
      <View style= {styles.messageBox}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      <View>
        <Entypo name="dots-three-horizontal" size={24} color="#7c7979" />
      </View>
    </View>
  );
};

export default NotiCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,

  },
  dot: {
    position: "absolute",
    top: 5,
    left: 5,
    },
  messageBox: {
    width: "80%",

  },
  messageText: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 20,
    },
});
