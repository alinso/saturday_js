import React from "react";


class Contact extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <div className="row outer">
                <div className={"col-md-6 text-align-left container"}>
                    <h4>İletişim</h4>
                    <hr/>
                    Her türlü geri dönüşün için instagramdan(@activuss),  mail@activityfriend.net(bunu tavsiye etmiyoruz, mail atmak çok yavaş bir iletişim şekli instagram daha iyidir)
                    üzerinden bizimle iletişime geçebilirsin.<br/>
                    Yeni, amatör ve sıfırdan başlayan bu projemizde tüm fikirler bizim için değerli.
                </div>
            </div>
        )
    }
}

export default Contact;