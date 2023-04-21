import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const SingleComment = (props) => {
  const { name, review, rating, date } = props;

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
      <View style={styles.header}>
        <View style={styles.name}>
          <Text style={styles.nameText}>{name}</Text>
          {<Rating />}
        </View>
        <Text style={styles.dataText}>{date}</Text>
      </View>
      <View style={styles.reviewBox}>
        <Text>{review}</Text>
      </View>
    </View>
  );
};

export default SingleComment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginVertical: 7,
    marginHorizontal: 25,
    minHeight: 80,
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,

  },
  header: {
    flexDirection: "row",
    backgroundColor: "#478adc",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  name: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 8,
  },
  dataText: {
    color: "#d8d3d3",
    fontSize: 12,
  
  },
  reviewBox: {
    width: "100%",
    justifyContent: "center",
    padding: 10,

  },
});
