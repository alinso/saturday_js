import React from "react";
import Security from "../../../security/Security";
import ProfilePic from "../../common/ProfilePic";
import UserFullName from "../../common/UserFullName";
import JSUtil from "../../../util/JSUtil";
const axios = require('axios');


class Blocks extends React.Component {
    constructor() {
        super();
        Security.protect()

        this.state={
            blocks:[],
            erorrs:{}
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

    unblock(id,name){
        const self  =this;

        if(window.confirm(" Engellediğiniz, "+name+" üzerindeki engeli kaldıracaksınız, emin misiniz?"))
            axios.get('http://localhost:8080/block/block/' + id, Security.authHeader())
                .then(function (response) {

                    let blocks = self.state.blocks;
                    JSUtil.deleteFromArrayByPropertyName(blocks,"id",id);
                    self.setState({blocks:blocks});
                })
                .catch(function (error) {
                });
    }


    render() {
        const self = this;
        return (
            <div className="row outer">
                <div className="col-md-6 m-x-auto container">
                    <h5>Engellediğim kişiler</h5>
                    {
                        self.state.blocks.map(function (block, i) {
                            return (
                                <div className={"row"}>
                                    <div className={"col-md-3 col-sm-3"}>
                                        <ProfilePic
                                            userId = {block.id}
                                            profilePicName={block.profilePicName}
                                            cssClass={"profilePicMedium"}
                                        />
                                    </div>
                                    <div className={"col-md-5 col-sm-5"}>
                                        <UserFullName
                                            userId={block.id}
                                            name={block.name}
                                            surname={block.surname}
                                        />
                                    </div>
                                    <div className={"col-md-3col-sm-3"}>
                                        <button onClick={()=>self.unblock(block.id,block.name)} className={"btn btn-danger"}>Engeli Kaldır</button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Blocks;