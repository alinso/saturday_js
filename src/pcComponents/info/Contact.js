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
                    Her türlü geri dönüşünüz için mail@activityfriend.net veya Whatsapp 0553 591 9925 kanalları
                    üzerinden bizimle iletişime geçebilirsiniz.<br/>
                    Yeni, amatör ve sıfırdan başlayan bu projemizde tüm fikirler bizim için değerlidir.
                </div>
            </div>
        )
    }
}

export default Contact;