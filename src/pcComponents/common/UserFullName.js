import React from "react";


class UserFullName extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        let self=this;
        return (
            <div>
                <a className="userFullName" href={"/profile/" + this.props.user.id}>
                <strong>
                    {self.props.user.premiumType==="GOLD" &&(

                        <span className={'goldCheck'}><i className="far fa-check-circle"/>&nbsp;</span>
                    )}
                    {self.props.user.premiumType==="SILVER" &&(

                        <span className={'silverCheck'}><i className="far fa-check-circle"/>&nbsp;</span>
                    )}

                    {this.props.user.name + " " + this.props.user.surname}</strong>
            </a></div>
        )
    }
}


export default UserFullName;

