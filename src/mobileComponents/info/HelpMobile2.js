import React from "react";


class HelpMobile2 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <div className="full-width text-align-left container">

                <h4>Kulaktan kulağa yayılmalıyız</h4>
                <hr/>

                <a className={"shareOnWhatsapp"}
                   href="whatsapp://send?text=Sana bu uygulamadan bahsetmis miydim? İlgini çekebilir, incele istersen https://www.activityfriend.net"
                   data-action="share/whatsapp/share"><strong>
                    Whatsapp'ta Paylaş <i className="fab fa-whatsapp"/></strong></a>
                <hr/>
                Merhaba,<br/>
                Reklamarımızı uzun süredir yayınlamıyoruz. Activity Friend'in reklama ihtiyacı mı var arkadaşlar?<br/>
                Çevrenizdeki genç, dinamik, kültürlü, güvendiğiniz insanlara bizi anlatabilirsiniz. Böylece hem rastgele insanlar yerine referansla gelmiş kişilerle
                    uygulamamız dolar,hem açtığınız aktivitelere katılan kişilerin sayı ve kalitesinde artış olur,  hem de daha fazla ve çeşitli aktivieler açılır.
                    <strong>Sayısal nedenlerden dolayı an itibariyle yalnız kadın alımı yapıyoruz, eğer kadın sayısı ciddi şekilde artar ise yalnız erkek alımı yaparız,
                        fakat kaliteli bir topluluk hedefinin haricinde ikinci bir madde olarak sayısal dengeli bir topluluk hedefimiz var</strong><br/>
                        <br/>
                        Ayrıca en etkili yöntemlerden biride @activityfriend insatgram hesabımızı buluşma sonrası fotoğraflarınızda etiketlemek olacak. Biz de o fotoğrafları
                sayfamızda paylaşabiliriz. Ankara bizi duysun!
                <br/><br/>
                Arkadaşlarınız Activity Friend'i sizden öğrendiği için size minnettar kalacak
                <br/><br/><br/>

            </div>

        )
    }
}

export default HelpMobile2;