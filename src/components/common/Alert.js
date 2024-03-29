import React from "react";


class Alert extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"alert "+this.props.type}><h5>{this.props.message}</h5></div>
        )
    }
}

export default Alert;