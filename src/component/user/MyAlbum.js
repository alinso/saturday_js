import React from "react";
import classnames from "classnames";
import security from "../../security/Security";

const axios = require('axios');


class MyAlbum extends React.Component {
    constructor(props) {
        super(props);
        security.protect();

        this.state = {
            errors: {},
            photos: [],
            loaded:0,
            selectedPhotos: []
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleSelectedFiles = this.handleSelectedFiles.bind(this);
        this.fillFields();
    };

    fillFields() {
        // console.log(this.props);
        // let self = this;
        // let userId = localStorage.getItem("userId");
        //
        // axios.get('http://localhost:8080/user/id/' + userId, security.authHeader())
        //     .then(function (response) {
        //         console.log(response);
        //         self.setState(response.data);
        //     })
        //     .catch(function (error) {
        //         console.log(error.response);
        //         self.setState({"errors": error.response.data});
        //     });
    }

    handleSelectedFiles = event => {
        this.setState({
            selectedPhotos: event.target.files,
            loaded: 0,
        })
    };

    handleUpload = () => {

        let data = new FormData();

        for (var key in this.state.selectedPhotos) {
            if (this.state.selectedPhotos.hasOwnProperty(key)) {
               let selectedFile = this.state.selectedPhotos [key];
                data.append('files', selectedFile, selectedFile.name);
                console.log(data);
            }
        }

        axios
            .post("http://localhost:8080/photo/upload", data, security.authHeader(), {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                },
            })
            .then(res => {
                this.setState({"profilePicUrl":res.data});
            });
    };

    render() {

        return (
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <input type="file" name="photos[]" onChange={this.handleSelectedFiles} multiple/>
                        <button onClick={this.handleUpload}>Upload</button>
                        <div> {Math.round(this.state.loaded)} %</div>
                    </div>
                </div>

        )
    }
}

export default MyAlbum;