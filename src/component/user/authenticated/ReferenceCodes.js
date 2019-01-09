    import React from "react";
    import Security from "../../../security/Security";
    const axios = require('axios');


    class ReferenceCodes extends React.Component {
        constructor() {
            super();
            Security.protect()

            this.state={
                references:[],
                erorrs:{}
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
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <h5>Sisteme referanssız üye olunamıyor, siz de bu referans kodları ile başkalarının üye olmasını sağlayabilirsiniz</h5>
                        {
                            self.state.references.map(function (reference, i) {
                                return (
                                    <div className={"row"}>
                                        <div className={"col-md-4 col-sm-4"}>
                                            <h4>{reference.referenceCode}</h4>
                                        </div>
                                        <div className={"col-md-8 col-sm-8"}>
                                            { reference.child && (
                                                reference.child.name)
                                            }
                                            { !reference.child && (
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