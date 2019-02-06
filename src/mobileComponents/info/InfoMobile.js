import React from "react";


class InfoMobile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <div className="full-width text-align-left container">
                <h4>Fırsatlar, Puanlama ve İşleyiş!</h4>
                <hr/>
                <h5><i className="fas fa-gift"/> Fırsatlar</h5>
                <span>Biz kulaktan kulağa yayılmak, insanları arkadaşlarıyla birlikte kazanmak istiyoruz.<br/> Bu nedenle referans olan kişilere de hediyeler veriyoruz.
                        1. Profilinizde "Referans Ol" linkinde bulunan referans kodu ile kaydolan her 5 kişi için 1 aylık premium üyelik kazanacaksınız.<br/><br/>
                         2. ilgili ay içindeki her referansınız için, her ay sonu yapacağımız <strong>Boyner'den 3 kişiye 100'er TL'lik (toplam 300 TL) hediye çeki</strong> çekişilişimize katılım
                        hakkınız olacak.(3 kişiye referans olan birinin kazanma şansı bir kişiye referans olan birinin kazanma şansının 3 katı)
                        <br/><br/>
                        3. Henüz çok yeniyiz, bu yüzden ilk 500 kullanıcıya 1 aylık premium üyelik hediye ediyoruz :)<br/>
                        4. Her ay tüm üyeler içide yapacağımız çekilişle sürpriz aktivitelere ücretsiz katılabileceksiniz. Her ayın sürprizi o ayın başında yayınlanacak.
                    </span><br/><br/>
                <hr/>
                <h5><i className="fas fa-medal"/> Puanlama</h5>
                <span>Activity Friend kişiler hakkında size buluşma öncesi fikir vermek istiyor. Bu yüzden bir puanlama ve yorum sistemimiz var.<br/>
                        Biriyle yaptığınız bir aktiviteden 1 saat sonra o kişi hakkında <strong>aktivite yorumu</strong> yapabilirsiniz, sistemdeki arkadaşlarınız
                        hakkında ise birlikte aktivite yapma şartı olmadan <strong>arkadaş yorumu</strong> yazabilirsiniz. Yorumlar silinemez, düzenlenemez ve o kişiyle
                        buluşmayı düşünen insanlar için fikir verir.<br/>
                        <br/><strong>Puanlama şu şekildedir</strong><br/>
                        5 puan -> Referans olduğunuz her kişi için,<br/>
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
                        <br/>Biz insanların <strong>premium üye olmadan sistemi rahatça kullanabilmelerini istiyoruz.</strong> Bu yüzden tüm kullanıcılar
                        haftada 2 aktivite açabilir ve günde 5 istek gönderebilir. Bu sayıların herkesin rahatça hareket edebileceği düzeyde olduğunu düşünüyoruz.
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