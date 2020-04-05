import React from "react";
import {Link} from 'react-router-dom';

function SelectPage(){
    return(
        <div>
            <Link to="/checkin">CheckIn   </Link>
            <Link to="/memberportal">LogIn   </Link>
            <Link to="/member">MemberPage   </Link>
            <Link to="/manage">Manage   </Link>
        </div>
    );
}

export default SelectPage;