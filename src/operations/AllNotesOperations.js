import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const UserCollectionRef = collection(db, "allnotes");
class ArchiveDataService {

  getAllUsers = () => {
    return getDocs(UserCollectionRef);
  };

}

export default new ArchiveDataService();