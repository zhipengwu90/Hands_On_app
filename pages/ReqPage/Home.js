import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  Modal,
} from "react-native";
import Task from "../../components/Task";
import timestampToDate from "../../util/timestampToDate";
import GlobalStyles from "../../constants/GlobalStyles";
import TextButton from "../../components/TextButton";
import ViewButton from "../../components/ViewButton";
import { Entypo } from "@expo/vector-icons";
import React, { useState, useContext, useEffect } from "react";
import NewTask from "./NewTask";
import { AuthContext } from "../../store/authContext";
import { ItemDataContext } from "../../store/dataContext";
import Toast from "react-native-root-toast";
import useNotiData from "./useNotiData";

import { db } from '../../util/firebaseConfig';
import { collection, getDocs, onSnapshot, query, orderBy, doc,where } from "firebase/firestore";

import * as Notifications from 'expo-notifications';

function Home({ navigation }) {
  const authCtx = useContext(AuthContext);
  const uid = authCtx.respondData.localId;
  const dataCtx = useContext(ItemDataContext);

  async function getData() {
    try {
      const collectionRef = collection(doc(db, 'requestData', 'taskList'), "allTasks");
      const unsubscribe = onSnapshot(query(collectionRef, where("uid", "==", uid), orderBy("date", "desc")),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().taskTitle,
          status: doc.data().status,
          date: timestampToDate(doc.data().date), 
          price: doc.data().price,
          taskType: doc.data().taskType,
          isCompleted: doc.data().isCompleted,
          description: doc.data().description,
          address: doc.data().address,
          estHour: doc.data().estHour,
          phone: doc.data().phone,
          uid: doc.data().uid,
          name: doc.data().name,
          helperId: doc.data().helperId,
          helperName: doc.data().helperName,
          isAccepted: doc.data().isAccepted,
          isReviewed: doc.data().isReqReviewed,
        }));
        dataCtx.setItemData(data);
      });
      return unsubscribe;
    } catch (err) {
      console.log(err);
      Toast.show('An error has occurred, please try again', {
        duration: 1300,
        position: Toast.positions.CENTER,
        backgroundColor: '#680808',
        shadow: true,
        animation: true,
        opacity: 1,
    });
    }
  }
  
  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const {notiData} = useNotiData(uid);


  // useEffect(() => {
  //   console.log('here');
    
  //   if(notiData.length !== 0){
  //   dataCtx.setNotificationData((el)=>[notiData, ...el ]);
  //   }
  // }, [notiData]);

  
   
      




  const [newTask, setNewTask] = useState(false);
  let NewTaskData = dataCtx.itemData.filter((item) => item.isCompleted === false && item.status !== "Cancelled");
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("Details", {
        id: itemData.item.id,
      });
    }

    return (
      <ViewButton onPress={pressHandler}>
        <Task
          title={itemData.item.title}
          status={itemData.item.status}
          date={itemData.item.date}
          price={itemData.item.price}
          category={itemData.item.taskType}
        />
      </ViewButton>
    );
  }

  useEffect(() => {

  Notifications.addNotificationResponseReceivedListener(response => {
    let notificationData = response.notification.request.content.data;
     
      navigation.navigate("NotificationStack");
    });
  
    return () => {
    };
  }, []);
  
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <Modal animationType="slide" transparent={false} visible={newTask}>
        <NewTask onPress={() => setNewTask(false)} />
      </Modal>
      <View style={styles.bannerContainer}>
        <View style={styles.bannerText}>
          <Text style={styles.bannerText1}>Hands On</Text>
          <Text style={styles.bannerText2}>Your dedicated helper</Text>
        </View>
        <Image
          source={require("../../assets/img/logo.png")}
          style={styles.bannerImg}
        />
      </View>
      <View style={styles.myTasks}>
        <Text style={styles.myTasksText}>My Tasks</Text>
        <TextButton
          style={styles.seeAllText}
          buttonText={styles.seeAllButton}
          onPress={() => navigation.navigate("Tasks")}
        >
          See All
        </TextButton>
      </View>
      <View style={styles.taskList}>
        {NewTaskData.length? <FlatList
          data={NewTaskData}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          style={{}}
        /> : <Text style={{textAlign: 'center', fontSize: 20, marginTop: 20}}>There is no task.</Text>}
      </View>
      <ViewButton style={styles.addTask} onPress={() => setNewTask(true)}>
        <Entypo name="new-message" size={40} color="#008c8c" />
      </ViewButton>
      
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  bannerContainer: {
    height: 140,
    flexDirection: "row",

    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: "#008c8c",
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  bannerImg: {
    width: 185,
    height: 165,
  },
  bannerText: {
    paddingLeft: 20,
    alignItems: "center",
  },
  bannerText1: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  bannerText2: {
    color: "#fff",
    fontSize: 15,
    marginTop: 8,
  },

  myTasks: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 22,
    marginTop: 10,
  },

  myTasksText: {
    fontSize: 23,
    fontWeight: "bold",
  },
  seeAllText: {
    fontSize: 14,
    alignSelf: "flex-end",
  },
  seeAllButton: {
    color: "#818181",
  },
  taskList: {
    paddingTop: 10,
    flex: 1,
  },
  addTask: {
    position: "absolute",
    color: "#100101",
    backgroundColor: "#ffffffae",
    width: 60,
    height: 60,
    right: 13,
    bottom: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 3, height: 2 },
    elevation: 4,
  },
});
