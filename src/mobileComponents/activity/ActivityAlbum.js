import React from "react";
import security from "../../security/Security";
import Globals from "../../util/Globals";


const axios = require('axios');


class ActivityAlbum extends React.Component {

    constructor(props) {
        super(props);
        security.protect();

        this.state = {
            errors: {},
            photoNames: [],
            loaded: 0,
            filesReady: "",
            selectedPhotos: []
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.handleSelectedFiles = this.handleSelectedFiles.bind(this);
        this.fillFields();
    };

    fillFields() {
        let self = this;


        axios.get(Globals.serviceUrl + 'activityPhoto/album/' + this.props.match.params.id, security.authHeader())
            .then(function (response) {
                self.setState({photoNames: response.data.photoNames});
            })
            .catch(function (error) {
                console.log(error.response);
                self.setState({"errors": error.response.data});
            });
    }

    handleSelectedFiles = event => {
        if (event.target.files.length > 3) {
            alert("Tek seferde en fazla 3 dosya seçebilirsin");
            return;
        }

        this.setState({
            selectedPhotos: event.target.files,
            loaded: 0,
        });
        this.setState({filesReady: "Fotorağlar yüklemeye hazır"})
    };

    handleUpload = () => {

        let data = new FormData();
        const self = this;

        for (var key in this.state.selectedPhotos) {
            if (this.state.selectedPhotos.hasOwnProperty(key)) {
                let selectedFile = this.state.selectedPhotos[key];
                data.append('files', selectedFile, selectedFile.name);
            }
        }

        axios.post(Globals.serviceUrl + "activityPhoto/upload/" + this.props.match.params.id, data, security.authHeader(), {
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
            }) .catch(function (error) {
            alert(error.response.data.userWarningMessage);
        });;
        this.setState({filesReady: ""})

    };


    deletePhoto(photoName) {

        const self = this;
        if (!window.confirm("Bu fotoğrafı kalıcı olarak silmek istiiyor musunuz?"))
            return;

        axios.post(Globals.serviceUrl + "photo/delete", {"fileName": photoName}, security.authHeader())
            .then(res => {

                let photoNames = self.state.photoNames;
                var index = photoNames.indexOf(photoName);
                if (index > -1) {
                    photoNames.splice(index, 1);
                }
                self.setState({photoNames: photoNames});
            });
    }

    render() {
        let photoSet = [];
        return (
            <div className="container">
                <div className={"half-left"}>
                <h5><a href={"/activityDetail/"+this.props.match.params.id}>Aktivite {this.props.match.params.id}</a> </h5>
                </div>
                <div className={"half-left"}>
                <h5><a href={"/messageActivity/"+this.props.match.params.id}>Grup Mesajları</a> </h5>
                </div>
                <span>Buraya aktiveden fotoğraflar yükleyebilirsin. Fotoğrafları sadece aktivite katılımcıları görebilir ve indirebilir. Aktivite tarihinden bir hafta sonra fotoğraflar otomatik olarak silinir</span>
                <hr/>
                {this.state.photoNames.map((photoName, i) => {
                        photoSet.push({"src": "/upload/" + photoName});
                        return (<div key={"key" + i} className="col-md-4">
                                <a href={"/upload/" + photoName} download> <img className="albumPhotoMobile"
                                     src={"/upload/" + photoName}
                                /></a>
                                <br/>
                                <br/><br/>
                            </div>
                        )
                    }
                )}


                <label className="btn btn-default">
                    <div className="uploadBrowseButton">Fotoğrafları Seç</div>
                    <span>(1 foto : max 4 MB)</span>
                    <input type="file" hidden name="photos[]" onChange={this.handleSelectedFiles} multiple/>
                </label>

                <div>
                    <div> {this.state.filesReady}</div>
                    <button className="btn btn-primary" onClick={this.handleUpload}>Fotoğrafları Yükle</button>
                </div>
                <br/><br/><br/>

            </div>
        )
    }
}

export default ActivityAlbum;