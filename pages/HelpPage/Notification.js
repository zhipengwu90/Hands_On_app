import {
    View,
    Text,
    Button,
    Platform,
    FlatList,
    StyleSheet,
  } from "react-native";
  import React, { useEffect, useContext } from "react";
  import Toast from "react-native-root-toast";
  import { ItemDataContext } from "../../store/dataContext";
  import NotiCard from "../../components/NotiCard";
  import ViewButton from "../../components/ViewButton";
  import { useNavigation } from "@react-navigation/native";
  
  function Notification({ navigation }) {
    const itemCtx = useContext(ItemDataContext);
    const notiData = itemCtx.NotificationData;
    const setNotiData = itemCtx.setNotificationData;
  

  
    const renderItem = ({ item, index }) => {
      function pressHandler() {
          let temp = [...notiData];
          temp[index].isRead = true;
          setNotiData(temp);
          navigation.navigate("Details", {
            id: item.taskId,
          });
        }
      
      return (
        <ViewButton onPress={pressHandler}>
          <NotiCard message={item.message} 
          isRead={item.isRead}
          />
        </ViewButton>
      );
    };
  
    return (
      <View style={styles.notiStyle}>
        {notiData.length ? (
          <FlatList
            data={notiData}
            keyExtractor={(item) => item.index}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20, paddingTop: 10}}
          />
        ) : (
          <Text style={{ textAlign: "center", fontSize: 20, marginTop: 20 }}>
            There is no notification.
          </Text>
        )}
      </View>
    );
  }
  
  export default Notification;
  
  const styles = StyleSheet.create({
      notiStyle: {
      flex: 1,
    },
  });
  