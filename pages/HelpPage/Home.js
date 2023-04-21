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
import GlobalStyles from "../../constants/GlobalStyles";
import TextButton from "../../components/TextButton";
import ViewButton from "../../components/ViewButton";
import { Entypo } from "@expo/vector-icons";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../../store/authContext";
import { ItemDataContext } from "../../store/dataContext";
import Toast from "react-native-root-toast";
import timestampToDate from "../../util/timestampToDate";
import { db } from '../../util/firebaseConfig';
import { collection, getDocs, onSnapshot, query, orderBy,doc, where, } from "firebase/firestore";
import * as Notifications from 'expo-notifications';
import useNotiData from "./useNotiData";



function Home({ navigation }) {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(ItemDataContext);
  const uid = authCtx.respondData.localId;
  
  async function getData() {
    try {
      const collectionRef = collection(doc(db, 'requestData', 'taskList'), "allTasks");

      const unsubscribe = onSnapshot(query(collectionRef, orderBy("date", "desc")),
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
          isAccepted: doc.data().isAccepted,
          helperId: doc.data().helperId,
          isReviewed: doc.data().isHelperReviewed,
          isRejected: doc.data().isRejected,
          isTerminated: doc.data().isTerminated,

        })).filter((item) => item.helperId === uid || item.status === "Posted");
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
  useEffect(() => {

    Notifications.addNotificationResponseReceivedListener(response => {
      let notificationData = response.notification.request.content.data;

        navigation.navigate("NotificationStack");
      });
    
      return () => {
      };
    }, []);
    const {notiData} = useNotiData(uid)






  let taskData = dataCtx.itemData.filter((item) => item.isCompleted === false &&item.status !== "Cancelled" );


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

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>

      <View style={styles.bannerContainer}>
        <Image
          source={require("../../assets/img/helpLogo.png")}
          style={styles.bannerImg}
        />
        <View style={styles.bannerText}>
          <Text style={styles.bannerText1}>Unlock Your Potential</Text>
          <Text style={styles.bannerText2}>Monetize Your Skills</Text>
        </View>
      </View>
      <View style={styles.myTasks}>
        <Text style={styles.myTasksText}>Recent Tasks</Text>
        <TextButton
          style={styles.seeAllText}
          buttonText={styles.seeAllButton}
          onPress={() => navigation.navigate("Tasks")}
        >
          See All
        </TextButton>
      </View>
      <View style={styles.taskList}>
      {taskData.length? <FlatList
          data={taskData}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
        /> : <Text style={{textAlign: 'center', fontSize: 20, marginTop: 20}}>There is no task.</Text>}
      </View>

    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  bannerContainer: {
    height: 140,
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: "#D35D5D",
    alignItems: "center",
    
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  bannerImg: {
    marginLeft: 20,
    width: 105,
    height: 155,

  },
  bannerText: {

    alignItems: "center",
  },
  bannerText1: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
  },
  bannerText2: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
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
});
