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

                <h4>Fırsatlar, Puanlama ve İşleyiş!</h4>
                <hr/>
                <h5><i className="fas fa-gift"/> Fırsatlar</h5>
                <span>
                      <br/>
                        1. Her ay tüm üyeler içide yapacağımız çekilişle sürpriz aktivitelere ücretsiz katılabileceksiniz. Her ayın sürprizi o ayın başında yayınlanacak.
                        Nisan 2019'da ilk etkinlikler başlayacak!<br/>
                                                Ayrıca Mart 2019 sonunda 3 kişiye Boyner'den toplam 300 TL değerinde hediye çekini çekilişle vereceğiz.

                    </span><br/><br/>
                <hr/>
                <h5><i className="fas fa-medal"/> Puanlama</h5>
                <span>Activity Friend kişiler hakkında size buluşma öncesi fikir vermek istiyor. Bu yüzden bir puanlama ve yorum sistemimiz var.<br/>
                        Biriyle yaptığınız bir aktiviteden 1 saat sonra o kişi hakkında <strong>aktivite yorumu</strong> yapabilirsiniz, sistemdeki arkadaşlarınız
                        hakkında ise birlikte aktivite yapma şartı olmadan <strong>arkadaş yorumu</strong> yazabilirsiniz. Yorumlar silinemez, düzenlenemez ve o kişiyle
                        buluşmayı düşünen insanlar için fikir verir.<br/>
                        <br/><strong>Puanlama şu şekildedir</strong><br/>
                        5 puan -> Hakkınızda yazılan her aktivite yorumu için,<br/>
                        3 puan -> Hakkınızda yazılan her arkadaş yorumu için,<br/>
                        3 puan -> Katıldığınız her aktivte için,<br/>
                        1 puan -> Açtığınız her aktivite için,<br/>
<br/>
                        -5 puan -> Hakkınızda yazılan her olumsuz aktivite yorumu için<br/>
                        -3 puan ->Hakkınızda yazılan her olumsuz arkadaş yorumu için kazanırsınız.
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