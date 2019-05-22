import React from "react";


class HelpMobile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <div className="full-width text-align-left container">

                <h4>Bugün kimi şikayet ettin?</h4>

                <hr/>
                Merhaba arkadaşlar,<br/>
                Kitlemiz içerisinde geleceğim deyip gelmeyenlerle ilgili yorumlarınızı ve diğer konulardaki şikayetlerinizi bekliyoruz.
                Amaç dışı kullanan, rahatsızlık veren, kaliteyi aşağı çektiğini düşündüğünüz kişileri şikayet edebilirsiniz. Biz ancak bu şekilde kitlemizde temizlik yapabiliyoruz.
            </div>

        )
    }
}

export default HelpMobile;