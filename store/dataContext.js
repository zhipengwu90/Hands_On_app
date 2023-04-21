import { createContext, useState } from "react";


export const ItemDataContext = createContext({
    itemData: [],
    setItemData: ()=>{},
    NotificationData: [],
    setNotificationData: ()=>{},
});

const ItemDataProvider =({children})=>{
    const [data, setData] = useState([])
    const [notificationData, setNotificationData] = useState([])

    function setItemData(data){
        setData(data);
    }
    function setNotiData(data){
        console.log(data);
        setNotificationData(data);
    }

    const value = {
        itemData: data,
        setItemData: setItemData,
        NotificationData: notificationData,
        setNotificationData: setNotiData,

    }
    return (
        <ItemDataContext.Provider value ={value}>
            {children}
        </ItemDataContext.Provider>
    )
}

export default ItemDataProvider;