import React from "react";
import UserUtil from "../../util/UserUtil";
import ProfilePicMobile from "../common/ProfilePicMobile";
import UserFullNameMobile from "../common/UserFullNameMobile";
import Globals from "../../util/Globals";
import Security from "../../security/Security";

const axios = require('axios');


class InviteMobile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: "",
            userNotFoundMessage: false,
            pageNum: 0,
            noMoreRecords: false,
            users: [],
            errors: {}
        };

        this.getMyList=this.getMyList.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.invite = this.invite.bind(this);
        let self = this;
        window.onscroll = function (ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                self.loadMore();
            }
        };
    }


    invite(readerId) {
        let activityId = this.props.match.params.activityId;
        axios.get(Globals.serviceUrl + 'invitation/invite/' + activityId + "/" + readerId, Security.authHeader())
            .then(function (response) {
                alert("Aktiviteye davet gönderildi");
            }).catch(function (error) {
            alert(error.response.data.userWarningMessage);
        });
    }

    loadMore() {
        const self = this;
        let newPageNum = this.state.pageNum + 1;
        this.setState({pageNum: newPageNum});

        let searchText = this.state.searchText;
        searchText = searchText.replace(" ","");


        axios.get(Globals.serviceUrl + 'user/search/' + searchText + "/" + newPageNum, Security.authHeader())
            .then(function (response) {
                if (response.data.length === 0) {
                    self.setState({noMoreRecords: true});
                    return;
                }
                let newUsers = self.state.users;
                newUsers = newUsers.concat(response.data);
                console.log(newUsers);
                self.setState({"users": newUsers});
            });
    }


    searchUser(searchTerm) {
        searchTerm = searchTerm.replace(" ","");
        let self = this;
        axios.get(Globals.serviceUrl + 'user/search/' + searchTerm + "/" + this.state.pageNum, Security.authHeader())
            .then(function (response) {
                self.setState({"users": response.data});
                self.setState({"userNotFoundMessage": false});

                if (response.data.length === 0)
                    self.setState({"userNotFoundMessage": "Kullanıcı Bulunamadı"});

            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    searchFromUrlQuery(searchText) {
        this.setState({"searchText": searchText});
        this.searchUser(searchText);
    }

    getMyList(){
        let self=this;
        axios.get(Globals.serviceUrl + "follow/myFollowings", Security.authHeader())
            .then(function (response) {
                self.setState({"users": response.data});
                self.setState({"userNotFoundMessage": false});

                if (response.data.length === 0)
                    self.setState({"userNotFoundMessage": "Kullanıcı Bulunamadı"});

            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        this.searchUser(this.state.searchText);
    }


    render() {

        const {userNotFoundMessage} = this.state;
        const self = this;

        return (
            <div className="full-width container">
                <span>
                    Tanıdığın veya tanımadığın insanları aktivitene davet edebilirsin. Yalnız %85 üzeri olumlu oranına sahip kullanıcılar bu özeiği kullanabilir. Bir davet gönderdiğinizde
                    diğer kullanıcıya bununla ilgili bir bildirim gider. Davet ettiğin kullanıcının eğer katılmak isterse aktivitene istek atması gerekir. Standart kullanıcılar 3, Gold kullancılar 25
                    davet gönderebilir<br/>
                    <br/>
                    Paylaştığın aktiviteye ilgi duyabileceğini düşündüğün kullanıcıları davet edersen daha çok verim alabilirsin.
                </span>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Ara..."
                            name="searchText"
                            value={this.state.searchText}
                            onChange={this.onChange}
                            required
                        />
                        <br/>
                        <label>İsim&nbsp;</label>

                        <input
                            type="submit" value="Kullanıcı Ara"
                            className="btn btn-primary btn-block mt-4"
                        />
                    </div>
                </form>
                <hr/>
                <button onClick={()=>this.getMyList()}>Listemi Getir</button>
                <hr/>
                {userNotFoundMessage && (
                    <h6>{userNotFoundMessage}</h6>
                )}

                {self.state.users.map((user, i) => {

                    return (<div className="full-width searchItemContainer">
                        <div className="half-left">
                            <ProfilePicMobile
                                userId={user.id}
                                profilePicName={user.profilePicName}
                                cssClass={"profilePicSmallMobile"}
                            />
                            <br/>
                            <UserFullNameMobile
                                user={user}
                            />
                        </div>
                        <div className={"half-left"}>
                            <h5>{UserUtil.translateGender(user.gender)} / {user.age}</h5>
                            <h4>{user.point} <i className="far fa-star"/></h4>
                            <button className={"btn btn-danger"} onClick={() => self.invite(user.id)}>DAVET ET</button>
                        </div>
                        <div className={"clear-both"}/>
                    </div>)
                })}
                <button hidden={this.state.noMoreRecords} className={"btn btn-primary"} onClick={this.loadMore}>Daha
                    fazla göster...
                </button>

            </div>

        )
    }
}

export default InviteMobile;