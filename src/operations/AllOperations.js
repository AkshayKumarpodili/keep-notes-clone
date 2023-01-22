import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const UserCollectionRef = collection(db, "user");
class UserDataService {

  getAllUsers = () => {
    return getDocs(UserCollectionRef);
  };

}

export default new UserDataService();