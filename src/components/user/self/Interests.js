import React from "react";
import Security from "../../../security/Security";
import Globals from "../../../util/Globals";

const axios = require('axios');


class Interests extends React.Component {
    constructor() {
        super();
        Security.protect();

        this.state = {
            allCategories: [],
            selectedCategoryIds: [],
            errors: {}
        };

        this.toggleInterest = this.toggleInterest.bind(this);
        this.onChange = this.onChange.bind(this);
        this.save=this.save.bind(this);

    }
    componentDidMount() {
        this.fillPage();
    }


    save() {
        let self = this;
        axios.post(Globals.serviceUrl + 'interest/saveUserInterests/',this.state.selectedCategoryIds, Security.authHeader())
            .then(function () {
               alert("İlgi alanlarını kaydettik");
               window.location.href="/myProfile";
            })
            .catch(function (errors) {
                alert(errors.response.data.userWarningMessage);
            });
    }

    fillPage() {
        const self = this;
        axios.get(Globals.serviceUrl + 'interest/allInterests', Security.authHeader())
            .then(function (response) {
                self.setState({allCategories: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

        axios.get(Globals.serviceUrl + "interest/myInterests/", Security.authHeader())
            .then(res => {

                let selectedCategoryIds = [];
                res.data.map(function (c) {
                    selectedCategoryIds.push(c.id);
                });
                self.setState({selectedCategoryIds: selectedCategoryIds});

            });
    }



    toggleInterest(id) {
        let alreadyExists = this.state.selectedCategoryIds.includes(id);
        let selectedCategoryIds = this.state.selectedCategoryIds;

        if (alreadyExists) {
            const index = this.state.selectedCategoryIds.indexOf(id);
            if (index > -1) {
                selectedCategoryIds.splice(index, 1);
            }
        } else {
            selectedCategoryIds.push(id);
        }

        this.setState({selectedCategoryIds: selectedCategoryIds});
    }



    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const self = this;
        return (
            <div className="full-width container">
                <h5>İlgi Alanlarım</h5>

                {this.state.allCategories.length > 0 && this.state.allCategories.map(function (cat) {

                    let catClass = "category-button-passive";
                    if (self.state.selectedCategoryIds.includes(cat.id))
                        catClass = "category-button-active";
                    return (
                        <div className={"half-left category-button " + catClass}
                             onClick={() => self.toggleInterest(cat.id)}>
                            <span style={{fontSize:"13px"}}>{cat.name} ({cat.watcherCount})</span>
                        </div>
                    )
                })}
                <div className={"clear-both"}/>
                <button type={"button"} className={"btn btn-info"} onClick={this.save}>Kaydet</button>
                <br/><br/>
            </div>
        )
    }
}

export default Interests;