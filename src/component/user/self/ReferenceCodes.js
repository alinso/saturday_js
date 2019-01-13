import React from "react";
import Security from "../../../security/Security";
import UserFullName from "../../common/UserFullName";

const axios = require('axios');


class ReferenceCodes extends React.Component {
    constructor() {
        super();
        Security.protect()

        this.state = {
            references: [],
            erorrs: {}
        };

        this.fillPage();
    }

    fillPage() {
        const self = this;
        axios.get('http://localhost:8080/reference/myReferences', Security.authHeader())
            .then(function (response) {
                self.setState({references: response.data});
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    render() {
        const self = this;
        return (
            <div className="row outer">
                <div className="col-md-6 m-x-auto container">
                    <h5>Sisteme referanssız üye olunamıyor, siz de bu referans kodları ile başkalarının üye olmasını
                        sağlayabilirsiniz</h5>
                    <hr/>
                    <div className={"row"}>
                        <div className={"col-md-4 col-sm-4"}>
                            Referans Kodu
                            <hr/>
                        </div>
                        <div className={"col-md-8 col-sm-8"}>
                            Kullanım Durumu
                        <hr/>
                        </div>
                    </div>
                    {
                        self.state.references.map(function (reference, i) {
                            return (
                                <div className={"row"}>
                                    <div className={"col-md-4 col-sm-4"}>
                                        <h4>{reference.referenceCode}</h4>
                                    </div>
                                    <div className={"col-md-8 col-sm-8"}>
                                        {reference.child && (
                                            <UserFullName
                                                userId={reference.child.id}
                                                name={reference.child.name}
                                                surname={reference.child.surname}
                                            />)
                                        }
                                        {!reference.child && (
                                            <h4>Kullanılmamış</h4>)
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ReferenceCodes;