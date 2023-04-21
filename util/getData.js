
import { db } from './firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

const getData = async (uid) => {
    const querySnapshot = await getDocs(collection(db, uid));
     const result = querySnapshot.docs.map((doc)=>({
            id: doc.id,
            title: doc.data().taskTitle,
            status: doc.data().status,
            date: doc.data().date.toDate().toLocaleString().replace(/T/, ' ').replace(/\..+/, '').slice(0, 16),
            price: doc.data().price,
            taskType: doc.data().taskType,
            isCompleted: doc.data().isCompleted,
            description: doc.data().description,
            address: doc.data().address,
            estHour: doc.data().estHour,
            phone: doc.data().phone,
        }))
        return result;
};

export  function getMyData(uid) {
    return getData(uid);
  }