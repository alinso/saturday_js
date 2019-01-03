// import Lightbox from 'react-images';
// import React from "react";
//
// class CustomLightBox extends React.Component {
//     constructor(props) {
//         super(props)
//
//         this.state = {
//             currentImageIndex: null,
//             isOpen: false
//         };
//
//             this.onClickPrev = this.onClickPrev.bind(this);
//             this.onClickNext = this.onClickNext.bind(this);
//             this.deletePhoto = this.deletePhoto.bind(this);
//             this.openLightbox = this.openLightbox.bind(this);
//             this.closeLightbox = this.closeLightbox.bind(this);
//
//     }
//
//
//     deletePhoto(photoName){
//         this.props.parentComponent.deletePhoto(photoName,this.props.parentComponent);
//     }
//
//     //lightbox methods
//     onClickPrev() {
//         let currentImageIndex = this.state.currentImageIndex;
//         currentImageIndex--;
//         this.setState({currentImageIndex: currentImageIndex});
//     }
//
//     onClickNext() {
//         let currentImageIndex = this.state.currentImageIndex;
//         currentImageIndex++;
//         this.setState({currentImageIndex: currentImageIndex});
//     }
//
//     openLightbox(currentImageIndex1) {
//         this.setState({currentImageIndex: currentImageIndex1});
//         this.setState({isOpen: true});
//     }
//
//     closeLightbox() {
//         this.setState({isOpen: false});
//     }
//
//
//     render() {
//         const self = this;
//         let photoSet = [];
//         let deleteButtonVisibility = false;
//
//         if (this.props.isOwner) {
//             deleteButtonVisibility = true
//         }
//         return (
//
//             <div className="row">
//                 {self.props.photoNames.map((photoName, i) => {
//                     photoSet.push({"src": "/upload/" + photoName});
//
//                     </div>)
//
//                 })}
//                 <Lightbox
//                     images={photoSet}
//                     isOpen={this.state.isOpen}
//                     currentImage={this.state.currentImageIndex}
//                     onClickPrev={() => this.onClickPrev()}
//                     onClickNext={() => this.onClickNext()}
//                     onClose={() => this.closeLightbox()}/>
//             </div>
//         )
//     }
// }
//
// export default CustomLightBox;