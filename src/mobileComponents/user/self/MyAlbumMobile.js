import React from "react";
import security from "../../../security/Security";
import Lightbox from 'react-images';


const axios = require('axios');


class MyAlbumMobile extends React.Component {

    constructor(props) {
        super(props);
        security.protect();

        this.state = {
            errors: {},
            photoNames: [],
            loaded: 0,
            selectedPhotos: []
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleSelectedFiles = this.handleSelectedFiles.bind(this);
        //lighbox methods
        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);

        this.fillFields();
    };

    fillFields() {
        let self = this;
        let userId = localStorage.getItem("userId");

        axios.get('http://localhost:8080/photo/album/' + userId, security.authHeader())
            .then(function (response) {
                self.setState({photoNames: response.data.photoNames});
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
        const self = this;

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
                let oldPhotos = self.state.photoNames;
                let allPhotosCombined = oldPhotos.concat(res.data);
                self.setState({photoNames: allPhotosCombined});
            });
    };


    deletePhoto(photoName) {

        const self = this;
        if (!window.confirm("Bu fotoğrafı kalıcı olarak silmek istiiyor musunuz?"))
            return;

        axios.post("http://localhost:8080/photo/delete", {"fileName": photoName}, security.authHeader())
            .then(res => {

                let photoNames = self.state.photoNames;
                var index = photoNames.indexOf(photoName);
                if (index > -1) {
                    photoNames.splice(index, 1);
                }
                self.setState({photoNames: photoNames});
            });
    }

    //lightbox methods
    onClickPrev() {
        let currentImageIndex = this.state.currentImageIndex;
        currentImageIndex--;
        this.setState({currentImageIndex: currentImageIndex});
    }

    onClickNext() {
        let currentImageIndex = this.state.currentImageIndex;
        currentImageIndex++;
        this.setState({currentImageIndex: currentImageIndex});
    }

    openLightbox(currentImageIndex1) {
        this.setState({currentImageIndex: currentImageIndex1});
        this.setState({isLightBoxOpen: true});
    }

    closeLightbox() {
        this.setState({isLightBoxOpen: false});
    }

    render() {
        let photoSet = [];
        const self = this;
        return (
            <div className="row outer">
                <div className="col-md-6 m-x-auto container">
                    <div className="row">
                        {this.state.photoNames.map((photoName, i) => {
                                photoSet.push({"src": "/upload/" + photoName});
                                return (<div key={"key" + i} className="col-md-4">
                                        <img className="albumPhoto"
                                             src={"/upload/" + photoName}
                                             onClick={() => self.openLightbox(i)}
                                        />
                                        <br/>
                                        <button type="button" className="btn" onClick={() => self.deletePhoto(photoName)}> X
                                            Fotoğrafı Sil
                                        </button>
                                        <br/><br/>
                                    </div>
                                )
                            }
                        )}

                        <Lightbox
                            images={photoSet}
                            isOpen={this.state.isLightBoxOpen}
                            currentImage={this.state.currentImageIndex}
                            onClickPrev={() => this.onClickPrev()}
                            onClickNext={() => this.onClickNext()}
                            onClose={() => this.closeLightbox()}/>

                    </div>
                    <label className="btn btn-default">
                        <div className="uploadBrowseButton">Fotoğrafları Seç</div>
                        <input type="file" hidden name="photos[]" onChange={this.handleSelectedFiles} multiple/>
                    </label>
                    <div>
                        <button className="btn btn-primary" onClick={this.handleUpload}>Fotoğrafları Yükle</button>
                    </div>
                    {(this.state.loaded > 0) &&
                    <div> {Math.round(this.state.loaded)} %</div>
                    }
                </div>
            </div>
        )
    }
}

export default MyAlbumMobile;