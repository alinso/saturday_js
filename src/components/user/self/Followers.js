import React from "react";
import Security from "../../../security/Security";
import ProfilePic from "../../common/ProfilePic";
import UserFullName from "../../common/UserFullName";
import JSUtil from "../../../util/JSUtil";
import Globals from "../../../util/Globals";

const axios = require('axios');


class Followers extends React.Component {
    constructor() {
        super();
        Security.protect()

        this.state = {
            followings: [],
            pageNum:0,
            noMoreRecords:false
        };


        this.fillPage=this.fillPage.bind(this);
        this.loadMore=this.loadMore.bind(this);
        this.fillPage(0);
    }

    loadMore() {
        let newPageNum = this.state.pageNum + 1;
        this.setState({pageNum: newPageNum});
        this.fillPage(newPageNum);
    }

    fillPage(pageNum) {
        const self = this;
        axios.get(Globals.serviceUrl+'follow/myFollowers/'+pageNum, Security.authHeader())
            .then(function (response) {

                if(response.data.length==0){
                    self.setState({noMoreRecords:true});
                    return;
                }

                let newFollowers = self.state.followings;
                newFollowers = newFollowers.concat(response.data);
                self.setState({followings: newFollowers});

            })
            .catch(function (error) {
                console.log(error.response);
            });

    }


    render() {
        const self = this;
        return (
            <div className="full-width container">
                <h5>Takipçilerim</h5>
                {
                    self.state.followings.map(function (following, i) {
                        return (
                            <div className={"full-width"}>
                                <div className={"half-left"}>
                                    <ProfilePic
                                        userId={following.id}
                                        profilePicName={following.profilePicName}
                                        cssClass={"profilePicSmallMobile"}
                                    />
                                    <br/>
                                    <UserFullName
                                        user={following}
                                    />
                                </div>
                                <div className={"clear-both"}/>
                                <hr/>

                            </div>
                        );
                    })
                }
                <br/>

                <button hidden={this.state.noMoreRecords} className={"btn btn-primary"} onClick={this.loadMore}>Daha
                    fazla göster...
                </button>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>

        )
    }
}

export default Followers;