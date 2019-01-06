import React from "react";
import classnames from "classnames";


class MeetingDetailInput extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (<div className="form-group">
                            <textarea
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": this.props.error
                                })}
                                placeholder="Nereye gideceksin.. Ne zaman gideceksin.. gibi detaylar"
                                name="detail"
                                value={this.props.detail}
                                onChange={this.props.onChange}
                            />
            {this.props.error && (
                <div className="invalid-feedback">
                    {this.props.error}
                </div>
            )}
        </div>)
    }
}


export default MeetingDetailInput;

