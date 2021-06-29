import React from 'react'
import { useHistory } from "react-router-dom";
import { logoutUser } from '../../serverCommunications'

export default function Logout(props) {
    const history = useHistory();

    logoutUser()
        .then(() => {
            props.setUsername('');
            props.setIsAuthenticated(false);
            props.setAdmin(false);
            props.resetUsedTable()
            history.push('/');
        })
        
    return(
        <div className="Logout">
            
        </div>
    )
}