import { useSelector } from "react-redux";
 import AdminPanel from "../../components/AdminPanel/AdminPanel";


function AdminPanelPage() {
    const {loading} = useSelector((state)=>state.auth);
    return (
      <div>
        <AdminPanel/>
      </div>
      )
    
  }
  
  export default AdminPanelPage;