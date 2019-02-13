import React from "react";
import security from "../../../security/Security";
import UserUtil from "../../../util/UserUtil";
import SinglePhotoSelector from "../../common/SinglePhotoSelector";
import Globals from "../../../util/Globals";

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

        axios.get(Globals.serviceUrl+'user/myProfile/', security.authHeader())
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
        if(this.state.selectedFile==null){
            this.setState({"errors":{file:"Fotoğraf dosyası seçmelisin"}});
            return;
        }
        data.append('file', this.state.selectedFile, this.state.selectedFile.name);
        const self = this;
        axios
            .post(Globals.serviceUrl+"user/updateProfilePic", data, security.authHeader(), {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                },
            })
            .then(res => {
                self.setState({"profilePicUrl": "/upload/profile/" + res.data});
                localStorage.setItem("profilePicName", res.data);
                self.setState({errors: false});
                window.location ="/profile/"+localStorage.getItem("userId");

            })
            .catch(function (error) {
                self.setState({isFileSelected: false});
                self.setState({"errors": error.response.data});
            });
    };

    render() {
        const {errors} = this.state;
        const {isFileSelected} = this.state;

        return (
            <div className="row outer">
                <div className="col-md-6 m-x-auto container">

                    <h3>Profil Fotoğrafını Güncelle</h3>
                    <img className="profilePicLarge" src={this.state.profilePicUrl}/>
                    <br/>
                    <SinglePhotoSelector
                        onChange={this.handleSelectedFile}
                        isFileSelected={isFileSelected}
                        error={errors.file}
                    />

                    <div>
                        <button className="btn btn-primary" onClick={this.handleUpload}>Fotoğrafı Yükle</button><br/>
                        (Max:3MB)
                    </div>
                </div>
            </div>
        )
    }

}

export default UpdateProfilePic;