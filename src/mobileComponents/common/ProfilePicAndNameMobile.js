import React from "react";
import UserUtil from "../../util/UserUtil";
import ProfilePicMobile from "./ProfilePicMobile";
import UserFullNameMobile from "./UserFullNameMobile";


class ProfilePicAndNameMobile extends React.Component {
    constructor(props) {
        super(props)
    }

    static defaultProps={cssClass:"profilePicLarge"};


    render() {
        return (
            <div className={"row"}>
                <ProfilePicMobile
                userId={this.props.userId}
                profilePicName={this.props.profilePicName}
                cssClass={"profilePicSmallMobile"}
                />
                <UserFullNameMobile
                userId={this.props.userId}
                name={this.props.name}
                surname={this.props.surname}
                />


            </div>
        )
    }
}


export default ProfilePicAndNameMobile;

