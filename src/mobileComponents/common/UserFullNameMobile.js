import React from "react";


class UserFullNameMobile extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        let self=this;
        return (
            <span>
                <a className="userFullName" href={"/profile/" + this.props.user.id}>
                <strong>
                    {self.props.user.premiumType==="GOLD" &&(

                        <span className={'goldCheck'}><i className="far fa-check-circle"/>&nbsp;</span>
                    )}
                    {self.props.user.premiumType==="SILVER" &&(

                        <span className={'silverCheck'}><i className="far fa-check-circle"/>&nbsp;</span>
                    )}
                    {self.props.user.premiumType==="ORGANIZATOR" &&(

                        <span className={'proCheck'}><i className="fas fa-certificate"/>&nbsp;</span>
                    )}

                    {this.props.user.name + " " + this.props.user.surname}</strong>
            </a></span>
        )
    }
}


export default UserFullNameMobile;

