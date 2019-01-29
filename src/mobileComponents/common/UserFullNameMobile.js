import React from "react";


class UserFullNameMobile extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <span>
                <a className="userFullName" href={"/profile/" + this.props.user.id}>
                <strong>
                    {this.props.user.userPremium && (
                        <span><i className="far fa-check-circle"/>&nbsp;</span>
                    )}

                    {this.props.user.name + " " + this.props.user.surname}</strong>
            </a></span>
        )
    }
}


export default UserFullNameMobile;

