import React from "react";


class BackToProfileMobile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"full-width"}><a className={"profileTitleMobile"} href={"/profile/"+localStorage.getItem("userId")}>
                <i className="fas fa-reply"/> Profile Dön
            </a>
            <hr/>
            </div>
        )
    }
}

export default BackToProfileMobile;