import React from "react";
import Security from "../../security/Security";
import Globals from "../../util/Globals";
import ProfilePic from "../../pcComponents/common/ProfilePic";
import UserFullName from "../../pcComponents/common/UserFullName";
import UserUtil from "../../util/UserUtil";
import ProfilePicMobile from "../common/ProfilePicMobile";
import UserFullNameMobile from "../common/UserFullNameMobile";

const axios = require('axios');


class Top100 extends React.Component {
    constructor(props) {
        super(props);
        Security.protect();

        this.state = {
            profileDtos: [],
        };

        this.fillPage();
    }


    fillPage() {
        let self = this;
        axios.get(Globals.serviceUrl + 'user/top100', Security.authHeader())
            .then(function (response) {
                self.setState({"errors": {}});
                self.setState({profileDtos: response.data});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });
    }

    render() {

        let self = this;
        return (
            <div className="full-width text-align-left container">
                <hr/>
                {self.state.profileDtos.map((user, i) => {

                    return (<div className="full-width searchItemContainer">
                        <div className="half-left">
                            <div className={"float-left"}>
                                <h5>{(i + 1)}&nbsp;</h5>
                            </div>
                            <div className={"float-left"}>
                                <ProfilePicMobile
                                    userId={user.id}
                                    profilePicName={user.profilePicName}
                                    cssClass={"profilePicSmallMobile"}
                                />
                                <br/>

                                <strong>
                                {user.userPremium && (
                                    <span><i className="far fa-check-circle"/>&nbsp;</span>
                                )}
                                {user.name }</strong>


                            </div>
                        </div>
                        <div className={"half-left"}>
                            <h5>{UserUtil.translateGender(user.gender)} / {user.age}</h5>
                            <h4>{user.point} <i className="far fa-star"/></h4>
                        </div>
                        <div className={"clear-both"}/>
                    </div>)
                })}
            </div>

        )
    }
}

export default Top100;