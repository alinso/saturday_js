import React, {Component} from "react";
import DownloadAppLink from "./DownloadAppLink";

class LandingMobile extends Component {

    render() {
        return (
            <div className={"landingContainerMobile"}>
                <div className={"landingSlideMobile"}>
                    <img src={"/img/landing_mobile_slide.jpg"} className={"full-width"}/>
                </div>

                <br/>
                <img src={"/img/site-logo-purple2.png"}/>
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
                <h5 className={"m-auto"}>Ankara'da bireysel kullanıcılar tarafından her hafta açılan yüzlerce aktiviteyi görmek yeya herhangi bir aktivitende sana eşlik edebilecek insanlar
                    bulmak için hemen kaydol!</h5>
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
                            Dışarı çıkmak, sinemaya, konsere gitmek, dans eğitimi almak veya haftasonu göl kıyısında
                            bisiklet sürmek istediğinde bazen arkadaşların sana eşlik edememişlerdir.
                            Activuss sayesinde dilediğin zaman yapmak istediklerini paylaşabilir ve planında
                            dahil olmak isteyen birçok insana ulaşabilirsin.
                            Sen de aynı şekilde insanların aktivitelerini görebilir ve onlara dahil
                            olabilirsin<br/><br/>
                            Activuss olarak topluluğumuzdaki insan kalitesini yüksek tutmak için gereken her şeyi yaptık. <strong>NEZİH VE GÜVENLİ BİR PLATFORM YARATTIK. </strong> Çok güçlü oylama ve yorum sistemimiz sayesinde belirli bir kalitenin üzerinde
                            bir kullanıcı kitlemiz var. Ayrıca kuralları ve işleyişi kadın dostu olarak tasarladık. Ankaralı kullanıcılar için verilen 20.000'den fazla oyu, yorum ve puanları inceleyip aktivitelerini
                            güvenle paylaşabilir veya başkalarına katılabilirsin.
                        </div>
                        <hr/>
                        <a href={"https://www.instagram.com/activuss/"}>
                        <button className={"btn btn-danger"}><strong><i className="fab fa-instagram"/> instagram sayfamıza göz at</strong></button>
                        </a>
                        <hr/>
                    </div>
                    <div className={"full-width"}>
                        <img src={"/img/landing_middle.png"} className={"full-width"}/>
                    </div>
                </div>

                <div className={"full-width landingText"}>
                    <h1><i className="far fa-gem"/></h1>
                    <span className={"landingTextTitle"}>Kaliteli bir Topluluk!</span><br/>
                    Sıradan bir kalabalık değil; saygılı, kültürlü insanlardan oluşan bir platform. Ortak ilgi alanları çevresinde buluşan şehrin harika insanları burada!
                </div>
                <div className={"full-width landingText"}>
                    <h1><i className="fas fa-venus-mars"/></h1>
                    <span className={"landingTextTitle"}>Kadın-Erkek Sayısı!</span><br/>
                    Hemen her ortamda bir cinsiyetin ezici çoğunlukta olduğu ülkemizde, tam tersini başaran, kadınların söz sahibi ve çoğunlukta olduğu örnek bir topluluk.
                </div>

                <div className={"full-width landingText"}>
                    <h1><i className="fas fa-user-check"/></h1>
                    <span className={"landingTextTitle"}>Puanlama ve Oylama!</span><br/>
                    Kullanıcı puanlama sistemi ve olumlu/olumusuz geri dönüşler yardımıyla ilgi alanlarına uygun
                    güvenilir kişileri seçebilirsin.
                </div>
                <div className={"full-width landingText"}>
                    <h1><i className="fas fa-crown"/></h1>
                    <span className={"landingTextTitle"}>İki Kat Eğlence!</span><br/>
                    Konser, piknik,fotoğrafçılık, yürüyüş, karaoke, paraşüt, kahve, resim, dans, tiyatro... Her ne yapmak istiyorsan
                    birlikte yapalım, eğlenceyi ikiye katlayalım.
                </div>
                <br/>
                <DownloadAppLink/>
                <br/><br/><br/>
                <div className={"full-width"}>
                    <div className={"landing_parallax"}>
                        <div className={"landing_parallax_textMobile"}>
                            Sosyal medya yalnızlaştırır!<br/>
                            Activuss sosyalleştirir.
                        </div>
                    </div>
                    <br/>
                </div>
                <h4 className={"landingTitle"}>Activuss Nasıl Çalışır?</h4>
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
                    <div className={"col-md-4"}><h6><i className="fab fa-instagram"/>/activuss</h6></div>
                    <div className={"col-md-4"}><h6><i className="far fa-envelope"/> mail@activuss.com
                    </h6></div>
                </div>
            </div>


        );
    }
}

export default LandingMobile;
