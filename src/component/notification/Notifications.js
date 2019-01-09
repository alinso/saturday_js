import React from "react";
import Security from "../../security/Security";
const axios = require('axios');


//meeting detail sayfası hazır, review detail sayfası yapılacak

class Notifications extends React.Component {
    constructor() {
        super();
        Security.protect()

        this.state={
            notifications:[],
            erorrs:{}
        };

        this.fillPage();
    }

    fillPage(){


        const self = this;
        axios.get('http://localhost:8080/notification/allNotifications/', Security.authHeader())
            .then(function (response) {
                self.setState({notifications: response.data});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });

        axios.get('http://localhost:8080/notification/readExceptMessages', Security.authHeader());

    }

    render() {
        const self = this;
        return (
            <div className="row">
                <div className="col-md-6 m-auto">
                    <h5>Yeni Bildirimler</h5>
                    {(this.state.notifications.length===0) &&(
                        <h4>Yeni bildirim yok!</h4>
                    )
                    }
                    {
                        self.state.notifications.map(function (not, i) {
                            return (
                                <div className={"row"}>
                                    <div className={"col-md-4 col-sm-4"}>
                                        <h4>{not.trigger.name}</h4>
                                    </div>
                                    <div className={"col-md-4 col-sm-4"}>
                                            <h4>{not.notificationType}</h4>
                                    </div>
                                    <div className={"col-md-4 col-sm-4"}>
                                        <h4>{not.message}</h4>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Notifications;