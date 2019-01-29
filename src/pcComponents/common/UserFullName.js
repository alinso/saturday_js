import React from "react";


class UserFullName extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div>
                <a className="userFullName" href={"/profile/" + this.props.user.id}>
                <strong>
                    {this.props.user.userPremium &&(
                        <span><i className="far fa-check-circle"/>&nbsp;</span>
                    )}
                    {this.props.user.name + " " + this.props.user.surname}</strong>
            </a></div>
        )
    }
}


export default UserFullName;

