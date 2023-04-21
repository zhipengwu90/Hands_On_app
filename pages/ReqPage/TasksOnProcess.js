import { View, Text, SafeAreaView, FlatList, ScrollView, StyleSheet } from "react-native";
import GlobalStyles from "../../constants/GlobalStyles";
import TaskData from "../../data/dummy-data.js";
import ViewButton from "../../components/ViewButton";
import Task from "../../components/Task";
import React, { useContext, useEffect } from "react";
import { ItemDataContext } from "../../store/dataContext";


function TasksOnProcess({navigation}) {

    const dataCtx = useContext(ItemDataContext);

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


    
  return (

        <View style={styles.container}>
        {NewTaskData.length? <FlatList
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10}} 
          data={NewTaskData}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          style={{}}
        /> : <Text style={{textAlign: 'center', fontSize: 20, marginTop: 20}}>There is no task.</Text>}
      </View>

  );
}

export default TasksOnProcess;

const styles = StyleSheet.create({
    container: {

        flex: 1,
    },


});
