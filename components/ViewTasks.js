import { FlatList, Text, View, StyleSheet } from "react-native";
import Task from "./Task";
import { db } from "../util/firebaseConfig";
import { collection, getDocs, query, where, doc, onSnapshot, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import Toast from "react-native-root-toast";


function ViewTasks(props) {

  const {viewUserUid} = props;
    const [taskList, setTaskList] = useState([]);
    async function getUserInfo() {
        try {
 
          const collectionRef = collection(
            doc(db, "requestData", "taskList"),
            "allTasks"
          );
          const unsubscribe =  onSnapshot(
            query(
              collectionRef,
              where("uid", "==", viewUserUid),
              orderBy("date", "desc")
            ),
            (querySnapshot) => {
              const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().taskTitle,
                status: doc.data().status,
                date: doc.data().date.toDate().toLocaleString(),
                price: doc.data().price,
                taskType: doc.data().taskType,
                isCompleted: doc.data().isCompleted,
                description: doc.data().description,
                address: doc.data().address,
                estHour: doc.data().estHour,
                phone: doc.data().phone,
                uid: doc.data().uid,
                name: doc.data().name,
              }));
              setTaskList(data);
              props.taskListLength(data.length);
            }
          );
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
        getUserInfo();
        return () => {};
      }, []);

    function renderCategoryItem(itemData) {
        // function pressHandler() {
        //   navigation.navigate("Details", {
        //     id: itemData.item.id,
        //   });
        // }
    
        return (
          // <ViewButton onPress={pressHandler}>
          <Task
            title={itemData.item.title}
            status={itemData.item.status}
            date={itemData.item.date}
            price={itemData.item.price}
            category={itemData.item.taskType}
            isReviewed={true}
          />
          // </ViewButton>
        );
      }
    




  return (
    <View style={styles.taskList}>
      {/* <Text style={styles.TaskListTitle}>His Tasks</Text> */}
      {taskList.length ? (
        <FlatList
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10}} 
          data={taskList}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          style={{}}
        />
      ) : (
        <Text style={{ textAlign: "center", fontSize: 20, marginTop: 20 }}>
          There is no task.
        </Text>
      )}
    </View>
  );
}

export default ViewTasks;

const styles = StyleSheet.create({
    TaskListTitle:{
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20,
        marginVertical: 5,
    
      },
 

});
