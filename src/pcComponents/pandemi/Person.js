import React from "react";


class Person extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (<div onClick={this.props.onClick} className={"pandemiPerson "+this.props.personStyle} style={{marginTop:this.props.top,
            marginLeft:this.props.left,width:this.props.size,height:this.props.size}}>&nbsp;</div>)
    }
}


export default Person;

