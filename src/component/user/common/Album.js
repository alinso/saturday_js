import React from "react";
import security from "../../../security/Security";

const axios = require('axios');


class Album extends React.Component {
    constructor(props) {
        super(props);
        security.protect()
        this.state = {
            errors: {},
            fullName: "",
            photoNames: [],
        };
        this.fillFields();
    };

    fillFields() {
        console.log(this.props);
        let self = this;

        axios.get('http://localhost:8080/photo/album/' + this.props.match.params.id, security.authHeader())
            .then(function (response) {
                self.setState({photoNames: response.data.photoNames});
                self.setState({fullName: response.data.fullName});
            })
            .catch(function (error) {
                console.log(error.response);
                self.setState({"errors": error.response.data});
            });
    }

    render() {
        const self = this;

        return (
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h5><a href={"/profile/"+this.props.match.params.id}> {this.state.fullName}</a> Fotoğrafları </h5>
                    <div className="row">
                        {self.state.photoNames.map((photoName, i) => {
                            return (<div className="col-md-4"><img className="albumPhoto" src={"/upload/" + photoName}/><br/>
                            </div>)
                        })}
                    </div>
                </div>
            </div>

        )
    }
}

export default Album;