import React from "react";


class HelpMobile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <div className="full-width text-align-left container">

                {/*<h4>Gelmeyenleri topluluğa bildir</h4>*/}
                {/*<hr/>*/}

                {/*<a className={"shareOnWhatsapp"}*/}
                {/*   href="whatsapp://send?text=Sana bu uygulamadan bahsetmis miydim? İlgini çekebilir, incele istersen https://www.activityfriend.net"*/}
                {/*   data-action="share/whatsapp/share"><strong>*/}
                {/*    Whatsapp'ta Paylaş <i className="fab fa-whatsapp"/></strong></a>*/}
                {/*<hr/>*/}

                {/*Burada gerçekten insanlar buluşuyor ve tanışıyor. Gerçekten gidiyorlar buluşma yerlerinde bekliyorlar. Bu yüzden bir aktiviteye katıldıysan mutlaka gitmelisin veya*/}
                {/*olabilecek en erken zamanda haber vermelisin. Biz burda asla geleceğim deyip gelmeyen insan istemiyoruz, bunu tekrarlayan hesapları da sileceğiz.*/}
                {/*<br/>*/}
                {/*Bu duruma kitlesel olarak hareket etmeli, ortak bir tavır koymalıyız. Buluşma öncesinde herkes diğer insaların onu bekleyeceğini bilerek bu sorumlulukla hareket etmeli.*/}
                {/*Buluşma sonrasında ise eğer gelmeyen olursa MUTLAKA o kişi ile ilgili gelmedi diye yorum yazmalısın.*/}
                {/*<br/>*/}
                {/*<strong>Bu konuda tek çözüm yorum yazmak! Eğer kişiler gelmiyor veya son dakika haber veriyorsa bunu yorum olarak yazmalısın. Bu şekilde ancak bu tatsız durumla mücadele edebiliriz</strong>*/}
                {/*<br/><br/><br/>*/}

                <h4>Daha fazla insana ulaşmak istiyoruz</h4>
                <hr/>

                <a className={"shareOnWhatsapp"}
                href="whatsapp://send?text=Sana bu uygulamadan bahsetmis miydim? İlgini çekebilir, incele istersen https://www.activityfriend.net"
                data-action="share/whatsapp/share"><strong>
                Whatsapp'ta Paylaş <i className="fab fa-whatsapp"/></strong></a>
                <hr/>
                Merhaba, biz bu projeyi yürüten iki arkadaşız, herhangi ticari bir amacımız veya sermayemiz yok.<br/>
                İnsanların yalnızlaştığına, sosyal medya ve internet bağımlılığının bizi gerçek hayattan, samimiyetten kopardığına inanıyoruz. <br/>
                Bununla mücadele etmek, şu kısa hayatımızda güzel birşeyler başarmak istiyoruz ve yardıma ihtiyacımız var.<br/><br/> <strong>Maddi bir destek asla istemiyoruz, </strong>
                arkadaşlarına bizden bahsederek , topluluğumuzun büyümesinde yardımcı olursan minnettar kalırız. Henüz kullanıcı sayımız çok az. Uygulamamızın daha aktif olması, sizin de
                daha fazla insanla tanışma şansınız olması için bu hareketi yaymamıza yardım edebilirsin.

                <br/><br/>
                Burayı okuyan, bizi katılımıyla mutlu eden ve umut veren herkese çok teşekkür ederiz...
                <br/><br/>

            </div>

        )
    }
}

export default HelpMobile;