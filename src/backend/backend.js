import { collection, addDoc, where, getDocs, query } from "firebase/firestore";
import {db} from './firebase';

async function addPersonToDb(personObj){
    
    let responseMsg='';   
    try {
        const q = query(collection(db, "persons"), where("person.idNumber", "==", personObj.idNumber));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            addDoc(collection(db, "persons"), {
                person: personObj
                }).then(responseMsg+="saved successfully");
            } else {
                responseMsg+='id number already exist in our system';     
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }   
            
    return responseMsg;
}

const backend = {addPersonToDb}

export default backend;