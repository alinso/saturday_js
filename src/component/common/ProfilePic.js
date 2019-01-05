import React from "react";
import UserUtil from "../../util/UserUtil";


class ProfilePic extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <a  href={"/profile/" + this.props.userId}>
                <img className={"profilePic"}
                     src={UserUtil.buildProfilePicUrl(this.props.profilePicName)}/>
            </a>
        )
    }
}


export default ProfilePic;

