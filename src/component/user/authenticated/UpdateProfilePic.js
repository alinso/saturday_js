import React from "react";
import security from "../../../security/Security";
import UserUtil from "../../../util/UserUtil";
import SinglePhotoSelector from "../../common/SinglePhotoSelector";

const axios = require('axios');


class UpdateProfilePic extends React.Component {
    constructor(props) {
        super(props);
        security.protect();

        this.state = {
            profilePicUrl: null,
            isFileSelected: false,
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
                self.setState({"profilePicUrl": UserUtil.buildProfilePicUrl(response.data.profilePicName)});

            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }

    handleSelectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
            isFileSelected: "Fotoğraf Yüklenmeye Hazır"
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
                self.setState({"profilePicUrl": "/upload/profile/" + res.data});
                self.setState({errors: false});

            })
            .catch(function (error) {
                self.setState({isFileSelected :false});
                self.setState({"errors": error.response.data});
            });
    };

    render() {
        const {errors} = this.state;
        const {isFileSelected}=this.state;

        return (
            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="col-md-4 m-auto">

                        <h3>Profil Fotoğrafını Güncelle</h3>
                        <img className="profilePicLarge" src={this.state.profilePicUrl}/>
                        <br/>
                        <SinglePhotoSelector
                            onChange={this.handleSelectedFile}
                            isFileSelected={isFileSelected}
                            error={errors.file}
                        />

                        <div>
                            <button className="btn btn-primary" onClick={this.handleUpload}>Fotoğrafı Yükle</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default UpdateProfilePic;