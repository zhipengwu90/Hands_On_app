import { useState, useEffect, useContext } from 'react';
import { db } from '../../util/firebaseConfig';
import { collection, getDocs, onSnapshot, query, orderBy, doc,where } from "firebase/firestore";
import { ItemDataContext } from "../../store/dataContext";

const useNotiData = (uid) => {

    const itemCtx = useContext(ItemDataContext);

    const notiData = itemCtx.NotificationData;
    const setNotiData = itemCtx.setNotificationData;
  
  

    const collectionRef = collection(doc(db, 'requestData', 'taskList'), "allTasks");


    useEffect(() => {
        const unsubscribe = onSnapshot(query(collectionRef, where("uid", "==", uid)),
        (querySnapshot) => { querySnapshot.docChanges().forEach((change) => {
            if (change.type === "modified") {
                const isRead = false;
                const data = change.doc.data();
                const taskId = change.doc.id;
                if (data.status === "Pending") {
                    const message = `${data.helperName} accepted your request for ${data.taskTitle}, please review it.`;
                    setNotiData((el)=>[{message, taskId, isRead }, ...el ]);
                }else if(data.isTerminated){
                    const message = `Your request for ${data.taskTitle} has been terminated,please review it.`;
                    setNotiData((el)=>[{message, taskId, isRead }, ...el ]);
                }else {
                    return;
                }

            }
        }
        );

        });
        return () => unsubscribe();

    
     
    }, []);
    
    return { notiData };
    };

export default useNotiData;