import React from "react";


class HelpMobile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <div className="full-width text-align-left container">
                {/*<strong>Dedikodu yapan kişilerin hesabı silinecek</strong><br/>*/}
                {/*<hr/>*/}
                {/*Merhaba, sizi rahatsız eden kişiler, ortamı bozan kişiler varsa uygulamada şikayet edebilirsiniz. Bunun yerine dedikodu yapma/arkadan konuşma yolunu seçen hesapları sileceğiz.*/}
                {/*Şikayet etmekten çekinip dedikodu yapmaktan çekinmeyen kişilerin ciddiyetine ve iyi niyetine inanmıyoruz. Arkadaşımı uyardım adı altında yapılacak olan dedikodular da silinmeye istisna değildir.*/}
                {/*<br/>*/}
                {/*Şikayet ederseniz o kişinin hesabı incelenir ve gerekiyorsa silinir. Şikayet eden kesinlikle gizlidir. Dedikodu yapanlar ise herkes tarafından bilinir. Ayrıca rahatsızlık veren kişiyi  arkadaşlarınıza*/}
                {/*anlatmak hem o kişinin toplulukta varlığını devam ettirmesine, hem o kişi tarafından kısa süre içinde arkasından konuştuğunuzun bilinmesine, hem de sizin hesabınızın silinmesine neden olur.*/}
                {/*<br/>*/}
                {/*Şikayetler Batman tarafından incelenir ve karara bağlanır Batman topluluk dışından biridir, kimseyi de tanımaz. Olabildiğince mantık çercevesinde karar vermeye çalışır*/}
                {/*<br/><br/>*/}
                {/*Teşekkürler :)*/}
                <br/>
                <strong> Sınıra takılma, öne geç!</strong>
                <hr/>
                <div className={"col-md-6 m-auto text-align-left"}>
                    <div className={"paymentIcons col-md-12 m-auto"}>
                        <i className="fas fa-glass-cheers"/>&nbsp;
                        <i className="fas fa-swimmer"/>&nbsp;
                        <i className="fas fa-bowling-ball"/>&nbsp;
                        <i className="fas fa-bicycle"/>&nbsp;
                        <i className="fas fa-award"/>&nbsp;
                        <i className="fab fa-fly"/>&nbsp;
                        <i className="fas fa-grin-stars"/>&nbsp;
                    </div>
                </div>

                Sınırlara takılmak istemiyor, aktivitelerde öne çıkmak ve projemize destek olmak istiyorsan premium
                olabilirsin. Premium özellik ve fiyatları aşağıdaki şekildedir.<br/>
                <a href={"https://www.activityfriend.net/message/3212"}> <button className={"btn btn-info"}>
                    Detaylar İçin Buradan Mesaj At
                </button></a>
                <br/>
                <br/>
                <strong><span className="silverCheck"><i className="far fa-check-circle"/>&nbsp;</span>SILVER onaylı
                    profil</strong>
                <br/>
                <span className="silverCheck"><i className="far fa-check-circle"/>&nbsp;</span>Hatfada 5 aktivite <br/>
                <span className="silverCheck"><i className="far fa-check-circle"/>&nbsp;</span>Günde 7 istek <br/>
                <span className="silverCheck"><i className="far fa-check-circle"/>&nbsp;</span>15 kişi onaylama <br/>
                (Aylık : 19.90 ₺/ 3 aylık : 49.90₺ / 6 aylık : 89.90₺) <br/>
                <br/>


                <strong><span className="goldCheck"><i className="far fa-check-circle"/>&nbsp;</span>GOLD onaylı
                    profil</strong>
                <br/>

                <span className="goldCheck"><i className="far fa-check-circle"/>&nbsp;</span>Haftada 10 aktivite <br/>
                <span className="goldCheck"><i className="far fa-check-circle"/>&nbsp;</span>Günde 20 istek <br/>
                <span className="goldCheck"><i className="far fa-check-circle"/>&nbsp;</span>25 kişi onaylama <br/>
                <span className="goldCheck"><i className="far fa-check-circle"/>&nbsp;</span>Dolu aktiviteye istek
                gönderme <br/>
                <span className="goldCheck"><i className="far fa-check-circle"/>&nbsp;</span>Aktivitene sınırsız istek
                alabilme <br/>
                <span className="goldCheck"><i className="far fa-check-circle"/>&nbsp;</span>Aktiviteye istek atmadan önce katılımcıları görebilme<br/>

                (Aylık : 29.90₺ / 3 aylık : 79.90₺)
            </div>

        )
    }
}

export default HelpMobile;