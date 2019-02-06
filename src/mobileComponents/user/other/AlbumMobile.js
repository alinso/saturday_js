import React from "react";
import security from "../../../security/Security";
import {isMobile} from 'react-device-detect';
import Lightbox from 'react-images';
import UserUtil from "../../../util/UserUtil";
import Globals from "../../../util/Globals";

const axios = require('axios');


class AlbumMobile extends React.Component {
    constructor(props) {
        super(props);
        security.protect();
        UserUtil.redirectIsBlocked(this.props.match.params.id);
        this.state = {
            errors: {},
            fullName: "",
            photoNames: [],
            isLightBoxOpen:false
        };
        this.fillFields();

        //lighbox methods
        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);

    };

    fillFields() {
        let self = this;

        axios.get(Globals.serviceUrl+'photo/album/' + this.props.match.params.id, security.authHeader())
            .then(function (response) {
                self.setState({photoNames: response.data.photoNames});
                self.setState({fullName: response.data.fullName});
            })
            .catch(function (error) {
                console.log(error.response);
                self.setState({"errors": error.response.data});
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
        const self = this;
        let photoSet=[];
        return (
            <div className="row outer">
                <div className="col-md-8 m-x-auto container">

                        <h5><a href={"/profile/" + this.props.match.params.id} className={"profileTitleMobile"}>
                            <i className="fas fa-camera-retro"/> {this.state.fullName}</a> Fotoğrafları</h5>
                    <hr/>
                    <div className="row">
                        {self.state.photoNames.map((photoName, i) => {
                            photoSet.push({"src": "/upload/" + photoName});
                            return (
                                <div key={"key" + i} className="col-md-4">
                                    <img className="albumPhotoMobile" src={"/upload/" + photoName}
                                         onClick={() => self.openLightbox(i)}/>
                                    <br/><br/>
                                </div>)

                        })}
                        {!isMobile &&
                        <Lightbox
                            images={photoSet}
                            isOpen={this.state.isLightBoxOpen}
                            currentImage={this.state.currentImageIndex}
                            onClickPrev={() => this.onClickPrev()}
                            onClickNext={() => this.onClickNext()}
                            onClose={() => this.closeLightbox()}/>
                        }
                    </div>
                    {(this.props.match.params.id==localStorage.getItem("userId")) &&(
                        <a className={"profileTitleMobile"} href={"/myAlbum"}><i className="fas fa-edit"/>Albümü Düzenle</a>
                    )}
                    <br/><br/>
                    </div>
                </div>
        )
    }
}

export default AlbumMobile;