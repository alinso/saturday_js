import React from "react";


class UserFullName extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div><a className="userFullName" href={"/profile/" + this.props.userId}>
                <strong>{this.props.name + " " + this.props.surname}</strong>
            </a></div>
        )
    }
}


export default UserFullName;

