import React from "react";
import Globals from "../../../util/Globals";
import Security from "../../../security/Security";
const axios = require('axios');


class EventEditButtons extends React.Component {
    constructor(props) {
        super(props);

        this.deleteevent=this.deleteevent.bind(this);
    }


    deleteevent(id) {

        const self = this;
        if (!window.confirm("Dışarı cıkmaktan  vaz mı geçtiniz?"))
            return;

        axios.get(Globals.serviceUrl + "event/delete/" + id, Security.authHeader())
            .then(res => {
                alert("event deleted");
                window.location = "/";
            });
    }

    render() {

        return (<div className={"float-right"}>

                <a href={"/invite/" + this.props.eventId}>
                    <button
                        className="btn btn-warning meetingProcess"><i className="fas fa-plus"/>
                    </button>
                </a>
                <a href={"/updateEvent/" + this.props.eventId}>
                    <button onClick={this.props.updateDiscover}
                            className="btn btn-info meetingProcess"><i className="fas fa-edit"/>
                    </button>
                </a>
                <button onClick={()=>this.deleteevent(this.props.eventId)}
                        className="btn btn-warning meetingProcess"><i className="fas fa-trash"/>
                </button>


            </div>
        )
    }

}
export default EventEditButtons;

