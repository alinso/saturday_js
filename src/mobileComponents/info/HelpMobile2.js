import React from "react";


class HelpMobile2 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <div className="full-width text-align-left container">
                {/*<h4>Bizi anlatır mısın!</h4>*/}
                {/*<hr/>*/}

                {/*<a className={"shareOnWhatsapp"}*/}
                {/*href="whatsapp://send?text=Sana bu uygulamadan bahsetmis miydim? İlgini çekebilir, incele istersen https://www.activityfriend.net"*/}
                {/*data-action="share/whatsapp/share"><strong>*/}
                {/*Whatsapp'ta Paylaş <i className="fab fa-whatsapp"/></strong></a>*/}
                {/*<hr/>*/}
                {/*Merhaba, biz bu projeyi yürüten iki arkadaşız, ticari bir yapımız veya sermayemiz yok.<br/>*/}
                {/*İnsanların yalnızlaştığına, sosyal medya ve internet bağımlılığının bizi gerçek hayattan, samimiyetten kopardığına inanıyoruz. <br/>*/}
                {/*Bununla mücadele etmek, şu kısa hayatımızda güzel birşeyler başarmak istiyoruz ve yardıma ihtiyacımız var.<br/><br/> <strong>Maddi bir destek asla istemiyoruz, </strong>*/}
                {/*arkadaşlarına bizden bahsederek , topluluğumuzun büyümesinde yardımcı olursan minnettar kalırız. Henüz kullanıcı sayımız çok az...*/}

                {/*<br/><br/>*/}
                {/*Burayı okuyan, bizi katılımıyla mutlu eden ve umut veren herkese çok teşekkür ederiz...*/}
                {/*<br/><br/>*/}
                {/*Ali ve Ömer*/}




                <h4>Yorum sistemini değiştirdik</h4>
                <hr/>

                <a className={"shareOnWhatsapp"}
                   href="whatsapp://send?text=Sana bu uygulamadan bahsetmis miydim? İlgini çekebilir, incele istersen https://www.activityfriend.net"
                   data-action="share/whatsapp/share"><strong>
                    Whatsapp'ta Paylaş <i className="fab fa-whatsapp"/></strong></a>
                <hr/>
                Merhaba,<br/>
                Artık buluşma saatinden 1 saat sonrasından başlayarak 2 gün içinde yorum yapabiirsiniz.<br/>
                Ayrıca yazılan yorumlar da 2 sonra gözükür olacak. Bu şekilde <strong>'o bana olumsuz yorum yazdı, ben de ona olumsuz yorum yazayım'</strong> yaklaşımı
                engellenmiş oldu. Buluşmalara gelmeyen veya son dakikada gelemiyorum diyenler hakkında olumsuz yorum yazmanız özellikle önemli.
            <br/><br/>
                Teşekkürler :)
                <br/><br/><br/>

            </div>

        )
    }
}

export default HelpMobile2;