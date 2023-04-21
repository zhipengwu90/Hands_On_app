import { Col, Row, Grid } from "react-native-easy-grid";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/styles";

const DetailInfo = ({ selectedTask, onPress, myUid, helperId, isAccepted }) => {
  return (
    <>
      <Grid>
        <Col style={styles.gridLeft}>
          <Text style={styles.leftText}>Post By:</Text>
        </Col>
        <Col>
          <Text style={styles.rightText}>
            <View style={styles.nameButton}>
            <Pressable
              onPress={onPress}
              style={({ pressed }) =>
                pressed
                  ? [styles.buttonInnerContainer, styles.pressed]
                  : styles.buttonInnerContainer
              }
              android_ripple={{ color: GlobalStyles.colors.primaryGreen }
            
            }
            >
                
              <View style={styles.nameButtonContainer}>
                <Ionicons name="person-outline" size={20} color="black" />
                <Text style={styles.nameButtonText}>{selectedTask.name}</Text>
              </View>
            </Pressable>
            </View>
          </Text>
        </Col>
      </Grid>

      <Grid>
        <Col style={styles.gridLeft}>
          <Text style={styles.leftText}>Task Type:</Text>
        </Col>
        <Col>
          <Text style={styles.rightText}>{selectedTask.taskType}</Text>
        </Col>
      </Grid>
      <Grid>
        <Col style={styles.gridLeft}>
          <Text style={styles.leftText}>Total Price:</Text>
        </Col>
        <Col>
          <Text style={styles.rightText}>${selectedTask.price}</Text>
        </Col>
      </Grid>
      <Grid>
        <Col style={styles.gridLeft}>
          <Text style={styles.leftText}>Estimated Time:</Text>
        </Col>
        <Col>
          <Text style={styles.rightText}>{selectedTask.estHour} hour(s)</Text>
        </Col>
      </Grid>
      {isAccepted && helperId === myUid && (
        <Grid>
          <Col style={styles.gridLeft}>
            <Text style={styles.leftText}>Phone Number:</Text>
          </Col>
          <Col>
            <Text style={styles.rightText}>{selectedTask.phone}</Text>
          </Col>
        </Grid>
      )}
      {isAccepted && helperId === myUid && (
        <Grid>
          <Col style={styles.gridLeft}>
            <Text style={styles.leftText}>Address:</Text>
          </Col>
          <Col>
            <Text style={styles.rightText}>{selectedTask.address}</Text>
          </Col>
        </Grid>
      )}
      <View>
        <Text style={styles.leftText}>Task Description:</Text>
        <Text style={styles.rightText}>{selectedTask.description}</Text>
      </View>
    </>
  );
};
export default DetailInfo;

const styles = StyleSheet.create({
  buttonInnerContainer: {
    elevation: 2,
  },

  pressed: {
    opacity: 0.75,
  },

  gridLeft: {
    width: "45%",
  },
  leftText: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 16,
  },
  rightText: {
    marginTop: 10,
    fontSize: 16,
  },
  nameButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f08484a5",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  nameButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
