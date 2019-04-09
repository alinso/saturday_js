import React, {Component} from "react";
import DownloadAppLink from "./DownloadAppLink";

class LandingMobile extends Component {

    render() {
        return (
            <div className={"landingContainerMobile"}>
                <div className={"landingSlideMobile"}>


                </div>

                <br/>
                <img src={"/img/site-logo-purple.png"}/>
                <div className={"col-md-6 m-auto"}>
                    <hr/>
                </div>
                <div className={"half-left"}>
                    <a href={"/login"}>
                        <button className={"btn btn-primary landingLoginRegisterMobile"}>Giriş Yap</button>
                    </a>
                </div>
                <div className={"half-left"}>
                    <a href={"register"}>
                        <button className={"btn btn-info landingLoginRegisterMobile"}>Kaydol</button>
                    </a>
                </div>
                <div className={"clear-both"}/>
                <br/>
                <h5 className={"m-auto"}>Tüm aktivitelerinde sana eşlik edebilecek insanlarla
                    tanış!</h5>

                <div className={"full-width"}>
                    <hr/>
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
                            ciddiye almasıdır. <strong>NEZİH VE GÜVENLİ BİR ORTAM OLMASINI İSTİYORUZ</strong> Geniş değil, doğru kitleye ulaşmaya çalışıyoruz. Activity Friend'de kadın
                            ve erkek kullanıcı sayısı dengelidir. Kullanıcılarla
                            ilgili yazılan yorum ve puanları inceleyip aktivitelerini
                            güvenle paylaşabilirsin.
                        </div>
                    </div>
                    <div className={"full-width"}>
                        <img src={"/img/landing_middle.png"} className={"full-width"}/>
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
                    sayısını dengeleyen örnek bir sistem olmayı hedefliyoruz.
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
                    Konser, piknik, rakı-balık, kahve falı, yürüyüş, karaoke, paraşüt... Her ne yapmak istiyorsan
                    birlikte yapalım, eğlenceyi ikiye katlayalım.
                </div>
                <br/>
                <DownloadAppLink/>
                <br/><br/><br/>
                <div className={"full-width"}>
                    <div className={"landing_parallax"}>
                        <div className={"landing_parallax_textMobile"}>
                            Sosyal medya yalnızlaştırır!<br/>
                            Activity Friend sosyalleştirir.
                        </div>
                    </div>
                    <br/>
                </div>
                <h4 className={"landingTitle"}>Activity Friend Nasıl Çalışır?</h4>
                <hr/>
                <div className={" howitworks1"}>
                    <h4><i className="far fa-play-circle"/> hareketi başlat.</h4>
                    <hr/>
                    <span className={"landingTitleCounter"}>1.</span> Bugün veya önümüzdeki günlerde ne
                    planlıyorsun,
                    paylaş.
                    <br/><br/>
                    <span className={"landingTitleCounter"}>2.</span> Planına dahil olmak isteyen insanlar
                    arasından dilediğini seç!
                </div>
                <div className={" howitworks2"}>
                    <h4><i className="far fa-hand-point-down"/> veya katıl.</h4>
                    <hr/>
                    <span className={"landingTitleCounter"}>1.</span> Yarın akşam veya birkaç gün içinde
                    kim ne yapıyor gör!
                    <br/><br/>
                    <span className={"landingTitleCounter"}>2.</span> Dilediğin kişinin planına dahil ol!
                </div>
                <hr/>
                <img className={"full-width"} src={"/img/all_birds.jpg"}/>
                <br/><br/>
                <div className={"landingText"}>
                    <h1><i className="fab fa-angellist"/></h1><br/>
                    <h4>Dışarıda Hayat Var!</h4><br/>
                </div>
                <a href={"/register"}>
                    <button className={"btn btnJoin"}><h1>Hadi sen de gel</h1></button>
                </a>


                <br/><br/><br/>
                <hr/>
                <div className={"text-align-left landingText "}>
                    <div className={"col-md-4"}><h6><i className="fab fa-instagram"/>/activityfriend</h6></div>
                    <div className={"col-md-4"}><h6><i className="far fa-envelope"/> friend@activityfriend.net
                    </h6></div>
                </div>
            </div>


        );
    }
}

export default LandingMobile;
