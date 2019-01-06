import React from "react";


class SinglePhotoSelector extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (
            <div>
                <label className="btn btn-default">
                    <div className="uploadBrowseButton">Fotoğraf Seç</div>
                    <input type="file" hidden onChange={this.props.onChange}/>
                    {
                        this.props.isFileSelected && (
                            <span><strong>{this.props.isFileSelected}</strong></span>
                        )

                    }
                    {this.props.error && (
                        <span>{this.props.error}</span>
                    )}

                </label><br/>

            </div>
        )
    }
}


export default SinglePhotoSelector;

