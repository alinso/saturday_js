import React from "react";
import classnames from "classnames";
import security from "../../../security/Security";


class SettingsMobile extends React.Component {
    constructor(props) {
        super(props);
        security.protect();

    }

    render() {

        return (
            <div>
                <div className="row">
                    <div className="col-md-8 m-auto">

                    </div>
                </div>
            </div>
        )
    }
}

export default SettingsMobile;