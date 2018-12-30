import React from "react";
import security from "../../../security/Security";
import UserUtil from "../../../util/UserUtil";

const axios = require('axios');


class UpdateProfilePic extends React.Component {
    constructor(props) {
        super(props);
        security.protect();

        this.state = {
            profilePicUrl: null,
            selectedFile: null,
            loaded: 0,
            errors: {}
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.fillFields();
    }


    fillFields() {
        let self = this;
        let userId = localStorage.getItem("userId");

        axios.get('http://localhost:8080/user/myProfile/', security.authHeader())
            .then(function (response) {
                console.log(response);
                self.setState({"profilePicUrl":UserUtil.buildProfilePicUrl(response.data.profilePicName)});

            })
            .catch(function (error) {
                console.log(error.response);
                self.setState({"errors": error.response.data});
            });
    }

    handleSelectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    };

    handleUpload = () => {
        const data = new FormData();
        data.append('file', this.state.selectedFile, this.state.selectedFile.name);
        const self = this;
        axios
            .post("http://localhost:8080/user/updateProfilePic", data, security.authHeader(), {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                },
            })
            .then(res => {
                self.setState({"profilePicUrl":"/upload/profile/"+res.data});

            })
            .catch(function (error) {
            self.setState({"errors": error.response.data});
        });
    };

    render() {
        const {errors} = this.state;

        return (
            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="col-md-4 m-auto">

                        <h3>Profil Fotoğrafını Güncelle</h3>
                        <img className="profilePic" src={this.state.profilePicUrl}/>

                        <input type="file" name="" id="" onChange={this.handleSelectedFile}/>
                        <button onClick={this.handleUpload}>Upload</button>
                        <div> {Math.round(this.state.loaded)} %</div>

                        {errors.file && (
                            <div>
                                {errors.file}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

}

export default UpdateProfilePic;