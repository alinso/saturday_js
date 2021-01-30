import React from "react";
import Globals from "../../../util/Globals";

const axios = require('axios');


class ApplicationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageNum: 0,
            noMoreRecords: false,
            applications: [],
            errors: {}
        };

        this.loadMore = this.loadMore.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.action = this.action.bind(this);
        let self = this;
        window.onscroll = function (ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                self.loadMore();
            }
        };
        this.getApplicants(0);
    }

    loadMore() {
        let newPageNum = this.state.pageNum + 1;
        this.setState({pageNum: newPageNum});
        this.getApplicants(newPageNum);
    }


    getApplicants(pageNum) {
        let self = this;
        axios.get(Globals.serviceUrl + 'application/all/' + pageNum)
            .then(function (response) {

                let newapplications = self.state.applications;
                newapplications = newapplications.concat(response.data);

                self.setState({"applications": newapplications});
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    action(result, id) {
        if (window.confirm("you want to " + result + " this?")) {
            axios.get(Globals.serviceUrl + 'application/action/' + result + "/" + id)
                .then(function (response) {
                    alert("saved");
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        this.searchapplication(this.state.searchText);
    }


    render() {

        const self = this;

        return (
            <div className="full-width container">

                {self.state.applications.map((application, i) => {

                    return (<div className="full-width searchItemContainer">
                        <div className="half-left">
                            <strong>{application.applicationStatus}</strong>
                            <br/>
                            {application.name} {application.surname}
                            <br/>
                            {application.phone}
                            <br/>
                        </div>
                        <div className={"half-left"}>
                            {application.about}
                        </div>
                        <div className={"clear-both"}/>
                        <div className={"half-left"}>
                            <div className={"btn btn-success"} onClick={() => self.action("approve", application.id)}>APPROVE</div>
                        </div>
                        <div className={"half-left"}>
                            <div className={"btn btn-danger"} onClick={() => self.action("decline", application.id)}>DECLINE</div>
                        </div>
                        <div className={"clear-both"}/>

                    </div>)
                })}
                <button hidden={this.state.noMoreRecords} className={"btn btn-primary"} onClick={this.loadMore}>Load
                    More
                </button>

            </div>

        )
    }
}

export default ApplicationList;