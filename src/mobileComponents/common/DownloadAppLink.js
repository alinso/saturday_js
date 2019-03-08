import React from "react";


class DownloadAppLink extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isWebView: false
        }

    }

    checkIfWebView() {

    }


    render() {
        return (


            <div className={"full-width"}>
                <div className={"half-left"}>
                    <a href={"https://play.google.com/store/apps/details?id=com.alinso.activity&hl=tr"}>
                        <img className={"androidDownloadLink"}
                             src={"/img/google-play.png"}/>
                    </a>
                </div>
                <div className={"half-left"}>
                    <br/>
                    <span className={"iosOnTheRoad"}>iOS uygulama yolda :)</span>
                </div>
            </div>
        )
    }
}


export default DownloadAppLink;




