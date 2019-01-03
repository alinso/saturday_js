import React from "react";
import security from "../../../security/Security";
import {isMobile} from 'react-device-detect';
import Lightbox from 'react-images';

const axios = require('axios');


class Album extends React.Component {
    constructor(props) {
        super(props);
        security.protect();
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
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h5><a href={"/profile/" + this.props.match.params.id}> {this.state.fullName}</a> Fotoğrafları </h5>
                    <div className="row">
                        {self.state.photoNames.map((photoName, i) => {
                            photoSet.push({"src": "/upload/" + photoName});
                            return (
                                <div key={"key" + i} className="col-md-4">
                                    <img className="albumPhoto" src={"/upload/" + photoName}
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
                    </div>
                </div>
        )
    }
}

export default Album;