import React from "react";


class Info extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (
            <div className="full-width text-align-left container">
                <h5><i className="fas fa-shield-alt"/> Güvenlik</h5>
                <span>Kaliteli bir kitle oluşturmak için eimizden geleni yapıyoruz ama yine de uygulamadaki kişilerle buluşurken tedbiri elden bırakmayın.<br/>
                            -Kişi hakkında yapılan yorumları inceleyin<br/>
                            -Google'da kişinin ismini aratarak gerçekten o kişinin söylediği kişi olup olmadığını kontrol etmeye çalışın.<br/>
                            -İlk buluşmalarınızı halka açık, güvenli yerlerde yapın.<br/>
                            -Suç unsuru barındıran hiçbir aktiviteye dahil olmayın.<br/>
<br/><br/>
                            <strong>Bulunduğunuz ortamda değer katmayan herkesle ilgili olumsuz oy verebilirsin.</strong><br/>
                            <strong>Şüpheli durumları şikayet edebilirsin</strong><br/>
                            Biz burada az ve iyi insan olsun istiyoruz.

                        </span>

                <br/>
                <hr/>

                <h5><i className="fas fa-shield-alt"/>Sosyal Skor</h5>
                <span>
                Olumlu-olumsuz izlenim oranı ve yorumlarla birlikte tanışmadan önce aktivitesine katılmayı veya aktivitene dahil etmeyi düşündüğün kullanıcılar
                    hakkında fikir alabileceğin bir puandır. Sistemdeki verileri kullanarak sonuç üretmeye çalışır.
                </span>

                <br/>
                <hr/>


                <h5><i className="fas fa-align-justify"/> Kurallar</h5>
                <span>Saygılı ve kibar olunmalı</span><br/>
                <span>Nefret dili değil, sevgi diliyle konuşulmalı</span><br/>
                <span>Aktiviteye uygulama dışından davet edeceğin kişiler için diğer insanlardan izin alınmalı</span><br/>
                <span>Yasa-Mantık-Ahlak dışı aktivite ve içerik paylaşımı yapılmamalı</span><br/>
                <span>Ticari amaçlarla veya tanıtım amacıyla aktivite açılmamalı</span><br/>
                <span>Facebook grupları, whatsapp grupları gibi sanal ortamlara kullanıcı toplama amaçlı aktiviteler açılmamalı</span><br/>
                <span>Sahte hesaplar açılmamalı</span><br/>
                <span>İnsanlar söz verdikleri zamanda aktivitelerde olmalı</span><br/>
                <span>Siyasi,dini,ideolojik eylemlerde bulunulmamalı</span><br/>
                <span>İçeriği net olmayan aktiviteler açılmamalı</span><br/>

                <br/>

                <hr/>
                <h5><i className="fas fa-medal"/> Puanlama</h5>
                <span>Activuss kişiler hakkında size buluşma öncesi fikir vermek istiyor. Bu yüzden bir puanlama ve yorum sistemimiz var.<br/>
                        Biriyle yaptığınız bir aktiviteden 1 saat sonra o kişi hakkında <strong>aktivite yorumu</strong> yapabilirsiniz. Puanlar ise uygulamamın doğru kullanımı,
                    topluluğa katma değer katacak davranışlara paralel olarak belirli bir formül dahilinde artıyor.
                    </span>
                <hr/>
                <h5><i className="fas fa-cogs"/> İşleyiş</h5>
                <span>Activuss işleyişi aşırı derecede basittir, çünkü ekran başında değil dışarıda gerçek insanlarla sosyalleşmenizi istiyoruz.
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

export default Info;