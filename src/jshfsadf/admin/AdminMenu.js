import React from "react";


class AdminMenu extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (<div className={"adminMenu col-md-2"}>
                <a href={"/uhktybb/discoverList"}>Duyurular</a>
                <br/>
                <a href={"/uhktybb/police"}>Polis</a>
                <br/>
                <a href={"/uhktybb/complaints"}>Şikayetler</a>
                <br/>
                <a href={"/uhktybb/premium"}>Premium</a>
                <br/>
                <hr/>
            </div>
        )
    }
}


export default AdminMenu;

