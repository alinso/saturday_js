import React from "react";
import classnames from "classnames";


class ActivityDetailInputMobil extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (<div className={"full-width text-align-left"}>
            <label><i className="fas fa-bars"/> Detaylar:</label>

            <textarea
                className={classnames("form-control form-control-lg breakLine", {
                    "is-invalid": this.props.error
                })}
                placeholder="Nereye gideceksin.. Ne zaman gideceksin.. gibi detaylar"
                name="detail"
                value={this.props.detail}
                onChange={this.props.onChange}
            />

            <label><i className="fas fa-bars"/> Hashtag:</label>

            <textarea
                className={classnames("form-control form-control-lg breakLine", {
                    "is-invalid": this.props.error
                })}
                placeholder="#bisiklet #doğa"
                name="hashtagListString"
                value={this.props.hashtagListString}
                onChange={this.props.onChange}
            />



            {this.props.error && (
            <div className="invalid-feedback">
                {this.props.error}
            </div>
        )}</div>)
    }
}


export default ActivityDetailInputMobil;

