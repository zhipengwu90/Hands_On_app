import { Col, Row, Grid } from "react-native-easy-grid";
import { Text, View, StyleSheet } from "react-native";
const DetailInfo = ({selectedTask}) => {
  return (
    <>
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
      <Grid>
        <Col style={styles.gridLeft}>
          <Text style={styles.leftText}>Phone Number:</Text>
        </Col>
        <Col>
          <Text style={styles.rightText}>{selectedTask.phone}</Text>
        </Col>
      </Grid>
      <Grid>
        <Col style={styles.gridLeft}>
          <Text style={styles.leftText}>Address:</Text>
        </Col>
        <Col>
          <Text style={styles.rightText}>{selectedTask.address}</Text>
        </Col>
      </Grid>
      <View>
        <Text style={styles.leftText}>Task Description:</Text>
        <Text style={styles.rightText}>{selectedTask.description}</Text>
      </View>
    </>
  );
};

export default DetailInfo;

const styles = StyleSheet.create({
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
});