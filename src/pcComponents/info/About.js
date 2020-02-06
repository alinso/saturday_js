import React from "react";


class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <div className="row outer">
                <div className={"col-md-6 text-align-left container"}>

                    <h4>Hakkında</h4>
                    <hr/>
                    Şubat 2019'da ilk kez kullanıma açılan Activuss ticari olmayan bir sosyal platformdur.
                    Bağımsız
                    geliştiriciler tarafından, sıfır sermaye ile
                    geliştirilip Ankara'da çıkış yapmıştır. İnsanların gerçek hayatta birlikte birşeyler yapmaları,
                    tanışmaları, bulundukları şehri yakından tanımaları amacını
                    taşımaktadır.<br/><br/>
                    Geliştirilmesi sürekli devam etmektedir.
                </div>
            </div>
        )
    }
}

export default About;