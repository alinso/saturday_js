import React from "react";


class AdminMenu extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (<div className={"adminMenu col-md-2"}>
                <a href={"/uhktybb/discoverList"}>Keşfet Yönetimi</a>
            </div>
        )
    }
}


export default AdminMenu;

