import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const TrashCollectionRef = collection(db, "trash");
class TrashDataService {

  getAllUsers = () => {
    return getDocs(TrashCollectionRef);
  };

 
}

export default new TrashDataService();