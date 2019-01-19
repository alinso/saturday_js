import React from "react";


class UserFullNameMobile extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <span>
                <a className="userFullName" href={"/profile/" + this.props.userId}>
                <strong>{this.props.name + " " + this.props.surname}</strong>
            </a></span>
        )
    }
}


export default UserFullNameMobile;

