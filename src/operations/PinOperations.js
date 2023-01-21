import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const PinCollectionRef = collection(db, "pin");
class PinDataService {

  getAllUsers = () => {
    return getDocs(PinCollectionRef);
  };

}

export default new PinDataService();