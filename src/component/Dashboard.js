import React from "react";

class Dashboard extends React.Component{
    render(){
        return(
            <div>
                Merhaba {localStorage.getItem("userName")}
            burası başlangıç sayfası
        </div>)
    }
}

export default Dashboard;