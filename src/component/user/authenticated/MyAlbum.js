import React from "react";
import classnames from "classnames";
import security from "../../../security/Security";

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
        console.log(this.props);
        let self = this;
        let userId = localStorage.getItem("userId");

        axios.get('http://localhost:8080/photo/album/' + userId)
            .then(function (response) {
                self.setState({photos:response.data});
            })
            .catch(function (error) {
                console.log(error.response);
                self.setState({"errors": error.response.data});
            });
    }

    handleSelectedFiles = event => {
        this.setState({
            selectedPhotos: event.target.files,
            loaded: 0,
        })
    };

    handleUpload = () => {

        let data = new FormData();
        const self  =this;

        for (var key in this.state.selectedPhotos) {
            if (this.state.selectedPhotos.hasOwnProperty(key)) {
               let selectedFile = this.state.selectedPhotos [key];
                data.append('files', selectedFile, selectedFile.name);
            }
        }

        axios.post("http://localhost:8080/photo/upload", data, security.authHeader(), {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                },
            })
            .then(res => {
                let oldPhotos=self.state.photos;
                let allPhotosCombined = oldPhotos.concat(res.data);
                self.setState({photos:allPhotosCombined});
            });
    };


    deletePhoto(photoName){
        const self  =this;
        console.log(photoName);
        axios.post("http://localhost:8080/photo/delete", {"fileName":photoName}, security.authHeader())
            .then(res => {
                let photoNames=self.state.photos;

                var index = photoNames.indexOf(photoName);
                if (index > -1) {
                    photoNames.splice(index, 1);
                }
                self.setState({photos:photoNames});
            });
    }

    render() {
        const self  =this;

        return (
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <div className="row">
                        {self.state.photos.map((photoName, i) => {
                            return (<div className="col-md-4"> <img className="albumPhoto" src={"/upload/" +photoName} /><br/>
                                <button type="button" className="btn btn-danger" value="Bunu Sil" onClick={()=>this.deletePhoto(photoName)}/> </div>)
                        })}
                        </div>

                        <input type="file" name="photos[]" onChange={this.handleSelectedFiles} multiple/>
                        <button onClick={this.handleUpload}>Upload</button>
                        <div> {Math.round(this.state.loaded)} %</div>
                    </div>
                </div>

        )
    }
}

export default MyAlbum;