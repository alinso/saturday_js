import React, {Component} from "react";
import ScrollableAnchor from 'react-scrollable-anchor'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

AOS.init();

class LandingMobile extends Component {

    render() {
        return (
            <div className={"landingContainer"}>
                <div className={"landingSlide"}>

                    <div className={"landingSlideTitleContainer"}>
                        <h5 className={"landingSlideTitle m-auto"}>Activity Friend</h5>
                    </div>
                </div>
                <br/>
                <div className={"half-left"}>
                    <a href={"/login"}>
                        <button className={"btn btn-primary landingLoginRegister"}>Giriş Yap</button>
                    </a>
                </div>
                <div className={"half-left"}>
                    <a href={"register"}>
                        <button className={"btn btn-info landingLoginRegister"}>Kaydol</button>
                    </a>
                </div>
                <div className={"clear-both"}/>
                <div className={"landingSlideTextContainer"}>
                    <h6 className={"landingSlideText m-auto"}>Tüm aktivitelerinde sana eşlik edebilecek insanlarla
                        tanış!</h6>
                </div>

                <div className={"full-width"}>
                    <h4 className={"landingTitle"}>Activity Friend Nedir?</h4>
                    <div className={"col-md-6 m-auto"}>
                        <hr/>
                    </div>
                    <div className={"full-width"}>
                        <div className={"landingText"}>
                            <div className={"landingIcons"}>
                                <i className="fas fa-bowling-ball"/>&nbsp;&nbsp;
                                <i className="fas fa-glass-cheers"/>&nbsp;&nbsp;
                                <i className="fas fa-theater-masks"/>&nbsp;&nbsp;
                                <i className="fas fa-chess"/>
                            </div>
                            Dışarı çıkmak, sinemaya, konsere gitmek veya haftasonu göl kıyısında
                            bisiklet sürmek istediğinde bazen yalnız kaldığın olmuştur.
                            Activity Friend sayesinde dilediğin zaman yapmak istediklerini paylaşabilir ve planında
                            dahil olmak isteyen birçok insana ulaşabilirsin.
                            Sen de aynı şekilde insanların aktivitelerini görebilir ve onlara dahil
                            olabilirsin<br/><br/>
                            Activity Friend'in en önemli taraflarından biri de içeriğindeki insan kalitesini çok
                            ciddiye almasıdır. Referansı olmayan kişiler üye olamadığı gibi
                            kadın ve erkek kullanıcı sayısı dengelidir.(%5 maksimum fark sınırı). Kullanıcılarla
                            ilgili yazılan yorum ve puanları inceleyip aktivitelerini
                            güvenle paylaşabilirsin.
                        </div>
                    </div>
                    <div className={"full-width"}>
                        <img src={"/img/activity_friend_about.jpeg"} className={"full-width"}/>
                    </div>
                </div>
                <h4 className={"landingTitle"}>Özellikler</h4>
                <hr/>
                <div className={"full-width landingText"}>
                    <h1><i className="far fa-gem"/></h1>
                    Kaliteli bir Topluluk!<br/>
                    Sıradan bir kalabalık değil; saygılı, kültürlü insanlardan oluşan bir platform
                    olmayı hedefliyoruz.
                </div>
                <div className={"full-width landingText"}>
                    <h1><i className="fas fa-venus-mars"/></h1>
                    Kadın-Erkek Sayısı!<br/>
                    Hemen her ortamda bir cinsiyetin ezici çoğunlukta olduğu ülkemizde, kadın-erkek
                    sayısını dengeleyen örnek bir sistem olmayı hedefliyoruz
                </div>

                <div className={"full-width landingText"}>
                    <h1><i className="fas fa-user-check"/></h1>
                    Referans ve Yorumlar!<br/>
                    Kullanıcı puanlama sistemi ve yorumlar yardımıyla ilgi alanlarına uygun
                    güvenilir kişileri seçebilirsin.
                    Ayrıca puan biriktirerek sürpriz ödüller kazanabilirsin.
                </div>
                <div className={"full-width landingText"}>
                    <h1><i className="fas fa-crown"/></h1>
                    İki Kat Eğlence!<br/>
                    Konser,piknik,rakı-balık,kahve falı,yürüyüş,karaoke... Her ne yapmak istiyorsan
                    birlikte yapalım, eğlenceyi ikiye katlayalım
                </div>
                <br/>
                <div className={"full-width"}>
                    <div className={"landing_parallax"}>
                        <div className={"landing_parallax_text"}>
                            Sosyal medya yalnızlaştırır,<br/>
                            Activity Friend sosyalleştirir.
                        </div>
                    </div>
                    <br/>
                </div>
                <h4 className={"landingTitle"}>Activity Friend Nasıl Çalışır?</h4>
                <hr/>
                <div className={" howitworks1 landingText"}>
                    <h4><i className="far fa-play-circle"/> hareketi başlat.</h4>
                    <hr/>
                    <span className={"landingTitleCounter"}>1.</span> Bugün veya bu haftasonu ne
                    planlıyorsun,
                    paylaş.
                    <br/><br/>
                    <span className={"landingTitleCounter"}>2.</span> Planına dahil olmak isteyen insanlar
                    arasından dilediğini seç!
                </div>
                <div className={" howitworks2 landingText"}>
                    <h4><i className="far fa-hand-point-down"/> veya katıl.</h4>
                    <hr/>
                    <span className={"landingTitleCounter"}>1.</span> Yarın akşam veya cuma öğleden sonra
                    kim ne yapıyor gör!
                    <br/><br/>
                    <span className={"landingTitleCounter"}>2.</span> Dilediğin kişinin planına dahil ol!
                </div>
                <hr/>
                <img className={"full-width"} src={"/img/all_birds.jpg"}/>
                <br/><br/>
                <a href={"/register"}>
                    <button className={"btn btn-success"}><h4><i className="fab fa-angellist"/>Aramıza
                        Sen De Katıl !</h4></button>
                </a>
                <hr/>

                <br/><br/><br/><br/>
                <div className={"row landingText"}>
                    <div className={"col-md-4"}><h5><i className="fab fa-instagram"/>/activityfriend</h5></div>
                    <div className={"col-md-4"}><h5><i className="far fa-envelope"/> friend@activityfriend.net
                    </h5></div>
                </div>
            </div>


        );
    }
}

export default LandingMobile;
