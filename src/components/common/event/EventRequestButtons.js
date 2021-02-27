import React from "react";
import Security from "../../../security/Security";
import Globals from "../../../util/Globals";
const axios = require('axios');


class EventRequestButtons extends React.Component {
    constructor(props) {
        super(props)
        this.joinevent = this.joinevent.bind(this);
        this.state={thisUserJoined:this.props.event.thisUserJoined}
    }


    joinevent(id) {
        const self = this;

        if (Security.isValidToken()) {

            let question = "Bu aktiviteye katılmak istediğinden emin misin?";

            if (this.state.thisUserJoined === 1 || this.state.thisUserJoined === 2)
                question = "Bu aktiviteden isteğini geri çekmek istediğine emin misin?";

            let result = window.confirm(question);
            if (!result)
                return;

            axios.get(Globals.serviceUrl + 'request/sendRequest/' + id, Security.authHeader())
                .then(function (response) {
                    let newThisUserJoined;
                    if(self.state.thisUserJoined==0)
                        newThisUserJoined=1;
                    if(self.state.thisUserJoined>0)
                        newThisUserJoined=0;
                    self.setState({thisUserJoined: newThisUserJoined});
                })
                .catch(function (error) {
                    alert(error.response.data.userWarningMessage);
                });
        }

    }

    render() {

            return (
                <div className={"float-left"}>
                    {this.state.thisUserJoined===1 && (<button
                            onClick={() => this.joinevent(this.props.event.id)}
                            className="btn btn-danger">
                            <span><i
                                className="fas fa-times"/>&nbsp;waiting</span>
                        </button>
                    )}
                    {this.state.thisUserJoined===2 && (<button
                            onClick={() => this.joinevent(this.props.event.id)}
                            className="btn btn-primary">
                            <span><i className="fas fa-check"/>&nbsp;approved</span>
                        </button>
                    )}

                    {this.state.thisUserJoined===0 && (<button
                        onClick={() => this.joinevent(this.props.event.id)}
                        className="btn btn-success">
                        <span className={""}><i className="fas fa-mug-hot"/>&nbsp; join{this.props.event.id}</span>
                    </button>)}
                </div>)


    }
}


export default EventRequestButtons;

