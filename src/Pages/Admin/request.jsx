import { useSelector } from "react-redux";
 import RequestPanel from "../../components/RequestPanel/RequestPanel"


function AdminPanelPage() {
    const {loading} = useSelector((state)=>state.auth);
    return (
      <div>
        <RequestPanel/>
      </div>
      )
    
  }
  
  export default AdminPanelPage;