import React from "react";


class CompleteProfile extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        let point = 0;

        if (this.props.age > 0)
            point = point + 20;

        if (this.props.profilePicName !== "")
            point = point + 20;

        if (localStorage.getItem("cityId") !== "null")
            point = point + 20;

        if (this.props.about !== "")
            point = point + 20;

        if (this.props.interestsArray.length > 0)
            point = point + 10;

        if (this.props.photoCount > 0)
            point = point + 10;

        const percentage  =point+"%";

        return (<div>
                {(this.props.userId === localStorage.getItem("userId")) &&
                (
                    <div className={"completeProfile"}>
                        <hr/>
                        <span>Profil Doluluk:(%{point})</span>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow={point} aria-valuemin="0" style={{width:percentage}}
                                 aria-valuemax="100">
                                <span className="sr-only">70% Tamam</span>
                            </div>
                        </div><br/>

                        {this.props.profilePicName === "" && (
                            <a href={"/updateProfilePic"}><div className={"completeProfileLink"}>Profil fotoğrafı yok</div></a>
                        )}
                        {this.props.age === null && (
                            <a href={"/updateInfo"}> <div  className={"completeProfileLink"}>Doğum tarihi yok</div></a>
                        )}
                        {(localStorage.getItem("cityId") === "null") && (
                            <a href={"/updateInfo"}>  <div  className={"completeProfileLink"}>Şehir Seçilmemiş</div></a>
                        )}
                        {(this.props.about === "") && (
                            <a href={"/updateInfo"}>   <div  className={"completeProfileLink"}>Hakkımda yok</div></a>
                        )}
                        {(this.props.interestsArray.length === 0) && (
                            <a href={"/updateInfo"}>  <div  className={"completeProfileLink"}>İlgi alanları yok</div></a>
                        )}
                        {(this.props.photoCount === 0) && (
                            <a href={"/myAlbum"}>  <div  className={"completeProfileLink"}>Albüm boş</div></a>
                        )}
                    </div>
                )}</div>
        )
    }
}


export default CompleteProfile;

