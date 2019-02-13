import React from "react";
import classnames from "classnames";


class ActivityDetailInput extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (<div className="row">
            <label className={"col-md-3 text-align-left"}><i className="fas fa-bars"/> Detaylar:</label>
            <div className={"col-md-9"}>
                            <textarea
                                className={classnames("form-control form-control-lg breakLine", {
                                    "is-invalid": this.props.error
                                })}
                                placeholder="Nereye gideceksin.. Ne zaman gideceksin.. gibi detaylar"
                                name="detail"
                                value={this.props.detail}
                                onChange={this.props.onChange}
                            />
            </div><br/>
            <label className={"col-md-3 text-align-left"}><i className="fas fa-hashtag"/> Hashtag Ekle:</label>
            <div className={"col-md-9"}>
                            <textarea
                                className={classnames("form-control form-control-lg breakLine", {
                                    "is-invalid": this.props.error
                                })}
                                placeholder="#gezi #spor #doğa #sinema"
                                name="hashtagListString"
                                value={this.props.hashtagListString}
                                onChange={this.props.onChange}
                            />
                {this.props.error && (
                    <div className="invalid-feedback">
                        {this.props.error}
                    </div>
                )}
            </div>

        </div>)
    }
}


export default ActivityDetailInput;

