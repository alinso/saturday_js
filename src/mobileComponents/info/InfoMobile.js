import React from "react";


class InfoMobile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <div className="full-width text-align-left container">
                <h4>Güvenlik</h4>
                <hr/>
                <span>Kaliteli bir kitle oluşturmak için eimizden geleni yapıyoruz ama yine de uygulamadaki kişilerle buluşurken tedbiri elden bırakmayın.<br/>
                            -Kişi hakkında yapılan yorumları inceleyin<br/>
                            -Google'da kişinin ismini aratarak gerçekten o kişinin söylediği kişi olup olmadığını kontrol etmeye çalışın.<br/>
                            -İlk buluşmalarınızı halka açık, güvenli yerlerde yapın.<br/>
                            -Suç unsuru barındıran hiçbir aktiviteye dahil olmayın.<br/>

                            <strong>Israrcı, alakasız mesaj atanları şikayet edin.</strong><br/>
                            <strong>Uygunsuz paylaşım yapanları şikayet edin</strong><br/>
                            <strong>Suç unsuru bulunan içerikleri şikayet edin</strong><br/>
                            <strong>Sahte olduğunu düşündüğünüz profilleri şikayet edin</strong><br/>
                            Biz burada az ve iyi insan olsun istiyoruz.

                        </span>

                <h4>Puanlama ve İşleyiş!</h4>
                <h5><i className="fas fa-medal"/> Puanlama</h5>
                <span>Activity Friend kişiler hakkında size buluşma öncesi fikir vermek istiyor. Bu yüzden bir puanlama ve yorum sistemimiz var.<br/>
                        Biriyle yaptığınız bir aktiviteden 1 saat sonra o kişi hakkında <strong>aktivite yorumu</strong> yapabilirsiniz. Puanlar ise uygulamamın doğru kullanımı,
                    topluluğa katma değer katacak davranışlara paralel olarak belirli bir formül dahilinde artıyor.
                    </span>
                <hr/>
                <h5><i className="fas fa-cogs"/> İşleyiş</h5>
                <span>Activity Friend işleyişi aşırı derecede basittir, çünkü ekran başında değil dışarıda gerçek insanlarla sosyalleşmenizi istiyoruz.
                    Yapmak istediğinizi toplulukla paylaşırsınız, gelmek isteyenler istek gönderir, dilediğiniz onaylar ve iletişime geçersiniz. Gönderilen istekleri
                        sadece aktiviteyi paylaşan ve istek gönderen kişi görür.<br/>

                    </span>
                <hr/>
                <h5><i className="fas fa-glass-cheers"/> Son olarak;</h5>
                Tanışın, öğrenin, deneyimleyin, sevin ve saygı duyun. Mutlu olun ve mutluluk dağıtın, hayatı
                paylaşın. Hayat paylaştıkça güzel !<br/>
                <br/>
                Mutlu kalın!

                <br/>
                <hr/>
                <div className={"half-left"}>
                    <a href={"/about"}><h5>Hakkında</h5></a>
                </div>
                <div className={"half-left"}>
                    <a href={"/contact"}><h5>İletişim</h5></a>
                </div>
                <br/> <br/><br/><br/>
            </div>
        )
    }
}

export default InfoMobile;