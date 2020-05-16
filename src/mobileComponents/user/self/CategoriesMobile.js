import React from "react";
import Security from "../../../security/Security";
import Globals from "../../../util/Globals";

const axios = require('axios');


class Categories extends React.Component {
    constructor() {
        super();
        Security.protect();

        this.state = {
            allCategories: [],
            selectedCategoryIds: [],
            errors: {}
        };

        this.toggleCategory = this.toggleCategory.bind(this);
        this.onChange = this.onChange.bind(this);
        this.save=this.save.bind(this);

    }
    componentDidMount() {
        this.fillPage();
    }


    save() {
        axios.post(Globals.serviceUrl + 'category/saveUserCategories/',this.state.selectedCategoryIds, Security.authHeader());
    }

    fillPage() {
        const self = this;
        axios.get(Globals.serviceUrl + 'category/allCategories', Security.authHeader())
            .then(function (response) {
                self.setState({allCategories: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

        axios.get(Globals.serviceUrl + "category/myCategories/", Security.authHeader())
            .then(res => {

                let selectedCategoryIds = [];
                res.data.map(function (c) {
                    selectedCategoryIds.push(c.id);
                });
                self.setState({selectedCategoryIds: selectedCategoryIds});

            });
    }



    toggleCategory(id) {
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
                             onClick={() => self.toggleCategory(cat.id)}>
                            <span>{cat.name}</span>
                        </div>
                    )
                })}
                <div className={"clear-both"}/>
                <button type={"button"} className={"btn btn-info"} onClick={this.save}>Kaydet</button>
            </div>
        )
    }
}

export default Categories;