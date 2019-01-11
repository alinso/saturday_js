import React from "react";
import UserUtil from "../../util/UserUtil";
import ProfilePic from "./ProfilePic";
import UserFullName from "./UserFullName";


class ProfilePicAndName extends React.Component {
    constructor(props) {
        super(props)
    }

    static defaultProps={cssClass:"profilePicLarge"};


    render() {
        return (
            <div className={"row"}>
                <ProfilePic
                userId={this.props.userId}
                profilePicName={this.props.profilePicName}
                cssClass={"profilePicSmall"}
                />
                <UserFullName
                userId={this.props.userId}
                name={this.props.name}
                surname={this.props.surname}
                />


            </div>
        )
    }
}


export default ProfilePicAndName;

