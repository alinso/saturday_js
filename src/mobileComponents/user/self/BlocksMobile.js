import React from "react";
import Security from "../../../security/Security";
import ProfilePicMobile from "../../common/ProfilePicMobile";
import UserFullNameMobile from "../../common/UserFullNameMobile";
import JSUtil from "../../../util/JSUtil";
import Globals from "../../../util/Globals";

const axios = require('axios');


class BlocksMobile extends React.Component {
    constructor() {
        super();
        Security.protect()

        this.state = {
            blocks: [],
            erorrs: {}
        };

        this.fillPage();
    }

    fillPage() {
        const self = this;
        axios.get(Globals.serviceUrl+'block/myBlocks', Security.authHeader())
            .then(function (response) {
                self.setState({blocks: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    unblock(id, name) {
        const self = this;

        if (window.confirm(" Engellediğiniz, " + name + " üzerindeki engeli kaldıracaksınız, emin misiniz?"))
            axios.get(Globals.serviceUrl+'block/block/' + id, Security.authHeader())
                .then(function (response) {

                    let blocks = self.state.blocks;
                    JSUtil.deleteFromArrayByPropertyName(blocks, "id", id);
                    self.setState({blocks: blocks});
                })
                .catch(function (error) {
                });
    }


    render() {
        const self = this;
        return (
            <div className="full-width container">
                <h5>Engellediğim kişiler</h5>
                {
                    self.state.blocks.map(function (block, i) {
                        return (
                            <div className={"full-width"}>
                                <div className={"half-left"}>
                                    <ProfilePicMobile
                                        userId={block.id}
                                        profilePicName={block.profilePicName}
                                        cssClass={"profilePicSmallMobile"}
                                    />
                                    <br/>
                                    <UserFullNameMobile
                                        user={block}
                                    />
                                </div>
                                <div className={"half-left"}><br/>
                                    <button onClick={() => self.unblock(block.id, block.name)}
                                            className={"btn btn-danger"}>Engeli Kaldır
                                    </button>
                                </div>
                                <div className={"clear-both"}/>
                                <hr/>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}

export default BlocksMobile;