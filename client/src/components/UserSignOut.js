import { useEffect} from 'react';
import { useNavigate }  from 'react-router-dom';

function UserSignOut({ context  }){
  const redirectTo = useNavigate(); 

  useEffect(() => {
    context.actions.signOut(); 
    return redirectTo('/'); 
  }); 
}

export default UserSignOut; 