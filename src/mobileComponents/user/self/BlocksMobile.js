import React from "react";
import Security from "../../../security/Security";
import ProfilePicMobile from "../../common/ProfilePicMobile";
import UserFullNameMobile from "../../common/UserFullNameMobile";
import JSUtil from "../../../util/JSUtil";
import BackToProfileMobile from "../../common/BackToProfileMobile";

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
        axios.get('http://localhost:8080/block/myBlocks', Security.authHeader())
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
            axios.get('http://localhost:8080/block/block/' + id, Security.authHeader())
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
                <BackToProfileMobile/>
                <h5>Engellediğim kişiler</h5>
                {
                    self.state.blocks.map(function (block, i) {
                        return (
                            <div className={"full-width"}>
                                <div className={"half-left"}>
                                    <ProfilePicMobile
                                        userId={block.id}
                                        profilePicName={block.profilePicName}
                                        cssClass={"profilePicSmall"}
                                    />
                                    <br/>
                                    <UserFullNameMobile
                                        userId={block.id}
                                        name={block.name}
                                        surname={block.surname}
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