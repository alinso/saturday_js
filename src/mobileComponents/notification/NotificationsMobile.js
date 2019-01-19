import React from "react";
import Security from "../../security/Security";
import UserFullNameMobile from "../common/UserFullNameMobile";
import ProfilePicMobile from "../common/ProfilePicMobile";

const axios = require('axios');


//meeting detail sayfası hazır, review detail sayfası yapılacak

class NotificationsMobile extends React.Component {
    constructor() {
        super();
        Security.protect()

        this.state = {
            notifications: [],
            erorrs: {}
        };

        this.fillPage();
    }

    fillPage() {


        const self = this;
        axios.get('http://localhost:8080/notification/allNotifications/', Security.authHeader())
            .then(function (response) {
                self.setState({notifications: response.data});
            })
            .catch(function (error) {
                self.setState({"errors": error.response.data});
            });

        axios.get('http://localhost:8080/notification/readExceptMessages', Security.authHeader());

    }

    newRequestText(id) {
        return (
            <span>
            <a href={"/activityRequests/" + id}>PAYLAŞTIĞINIZ AKTİVİTEYE</a> katılmak istiyor.
            </span>
        )
    }

    newMessageText() {
        return (
            <span>
                size bir <a href={"/conversations/"}>BİR MESAJ</a> gönderdi.
            </span>
        )
    }

    newReviewText(id) {
        return (
            <span>
                sizin için <a href={"/review/" + id}>BİR YORUM</a> yazdı.
            </span>
        )
    }

    newRequestApprovalText(id) {
        return (
            <span>
                katılmak istediğiniz <a href={"/activityDetail/" + id}>AKTİVİTESİ</a> için siz onayladı, iyi eğlenceler
                dileriz:)
            </span>
        )
    }

    newFollowingText(id) {
        return (
            <span>
            <a href={"/activityDetail/" + id}>YENİ BİR AKTİVİTE</a> paylaştı.
            </span>
        )
    }

    newMeetingCommentAvailable(id) {
        return (
            <span>
            Yakın zamanda <a href={"/activityDetail/" + id}>BİR AKTİVİTEYE</a> katıldın. Katıldığın diğer kişilerle ilgili 10 gün içinde yorum yapabilirsin.
                Böylece Activity Friend'in büyümesine yardımcı olabilirsin.
            </span>
        )
    }

    readedClass(isRead) {
        if (isRead)
            return "readedNotification";
        else
            return "newNotification"
    }


    render() {
        const self = this;
        return (
            <div className="full-width container">
                <h5 className={"profileTitle"}>Tüm Bildirimler</h5>
                {(this.state.notifications.length === 0) && (
                    <h4>Hiç bildirim yok!</h4>
                )}
                {
                    self.state.notifications.map(function (not, i) {

                        return (
                            <div key={i} className={"notificationRow " + self.readedClass(not.read)}>
                                {(not.trigger) &&
                                (
                                    <div className={"float-left"}>
                                        <ProfilePicMobile
                                            userId={not.trigger.id}
                                            profilePicName={not.trigger.profilePicName}
                                            cssClass={"profilePicSmall"}
                                        />
                                    </div>
                                )}
                                <div className={"notificationText text-align-left"}>

                                    <div className={"full-width text-align-right messageDate"}>
                                        {not.createdAtString}
                                    </div>

                                    {(not.trigger) &&
                                    (<div className={"notificationUserName"}>
                                            <UserFullNameMobile
                                        userId={not.trigger.id}
                                        name={not.trigger.name}
                                        surname={not.trigger.surname}
                                        /><br/></div>
                                    )}

                                    {(not.notificationType === "REQUEST") &&
                                    self.newRequestText(not.message)
                                    }
                                    {(not.notificationType === "MESSAGE") &&
                                    self.newMessageText()
                                    }

                                    {(not.notificationType === "REVIEW") &&
                                    self.newReviewText(not.message)
                                    }
                                    {(not.notificationType === "REQUEST_APPROVAL") &&
                                    self.newRequestApprovalText(not.message)
                                    }
                                    {(not.notificationType === "FOLLOWING") &&
                                    self.newFollowingText(not.message)
                                    }
                                    {(not.notificationType === "MEETING_COMMENT_AVAILABLE") &&
                                    self.newMeetingCommentAvailable(not.message)
                                    }

                                </div>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}

export default NotificationsMobile;