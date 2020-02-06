import React, {Component} from "react";
import ScrollableAnchor from 'react-scrollable-anchor'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

AOS.init();

class Landing extends Component {

    render() {
        return (
            <div className={"landingOuter"}>
                <div className={"landingSlide"}>

                    <div className={"landingSlideTitleContainer"}>
                        <h1 className={"landingSlideTitle m-auto"}>Activuss</h1>
                    </div>
                    <div className={"landingSlideTextContainer"}>
                        <h4 className={"landingSlideText m-auto"}>Tüm aktivitelerinde sana eşlik edebilecek insanlarla
                            tanış!</h4>
                    </div>
                </div>

                <ScrollableAnchor id={'whatis'}>
                    <div className={"col-md-9 m-auto"}>
                        <div className={"col-md-12"}>
                            <h4 className={"landingTitle"}>Activuss Nedir?</h4>
                            <div className={"col-md-6 m-auto"}>
                                <hr/>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div data-aos="fade-right" className={"col-md-6 landingText"}>
                                <br/><br/>
                                <div className={"landingIcons"}>
                                    <i className="fas fa-bowling-ball"/>&nbsp;&nbsp;
                                    <i className="fas fa-glass-cheers"/>&nbsp;&nbsp;
                                    <i className="fas fa-theater-masks"/>&nbsp;&nbsp;
                                    <i className="fas fa-chess"/>
                                </div>
                                Dışarı çıkmak, sinemaya, konsere gitmek veya haftasonu göl kıyısında
                                bisiklet sürmek istediğinde bazen yalnız kaldığın olmuştur.
                                Activuss sayesinde dilediğin zaman yapmak istediklerini paylaşabilir ve planında
                                dahil olmak isteyen birçok insana ulaşabilirsin.
                                Sen de aynı şekilde insanların aktivitelerini görebilir ve onlara dahil olabilirsin<br/><br/>
                                Activuss'un en önemli taraflarından biri de içeriğindeki insan kalitesini çok
                                ciddiye almasıdır. Geniş değil, doğru kitleye ulaşmaya çalışıyoruz. Activuss'ta
                                kadın ve erkek kullanıcı sayısı dengelidir. Kullanıcılarla
                                ilgili yazılan yorum ve puanları inceleyip aktivitelerini
                                güvenle paylaşabilirsin.
                            </div>
                            <div className={"col-md-6"} data-aos="fade-left">
                                <img src={"/img/landing_middle.png"} className={"full-width"}/>
                            </div>
                        </div>
                    </div>
                </ScrollableAnchor>
                <ScrollableAnchor id={'features'}>
                    <div className={"col-md-12 m-auto landingFeatures"}>
                        <div className={"col-md-12"}>
                            <h4 className={"landingTitle"}>Özellikler</h4>
                            <div className={"col-md-6 m-auto"}>
                                <hr/>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col-md-2"}>&nbsp;</div>
                            <div className={"col-md-2"} data-aos="fade-right">
                                <img src={"/img/activity_friend_features.png"} className={"full-width"}/>
                            </div>
                            <div data-aos="fade-left" className={"col-md-6 landingText"}>
                                <div className={"row"}>
                                    <div className={"col-md-6"}>
                                        <h1><i className="far fa-gem"/></h1>
                                        Kaliteli bir Topluluk!<br/>
                                        Sıradan bir kalabalık değil; saygılı, kültürlü insanlardan oluşan bir platform
                                        olmayı hedefliyoruz.
                                    </div>
                                    <div className={"col-md-6"}>
                                        <h1><i className="fas fa-venus-mars"/></h1>
                                        Kadın-Erkek Sayısı!<br/>
                                        Hemen her ortamda bir cinsiyetin ezici çoğunlukta olduğu ülkemizde, kadın-erkek
                                        sayısını dengeleyen örnek bir sistem olmayı hedefliyoruz.
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className={"col-md-6"}>
                                        <h1><i className="fas fa-user-check"/></h1>
                                        Referans ve Yorumlar!<br/>
                                        Kullanıcı puanlama sistemi ve yorumlar yardımıyla ilgi alanlarına uygun
                                        güvenilir kişileri seçebilirsin.
                                        Ayrıca puan biriktirerek sürpriz ödüller kazanabilirsin.
                                    </div>
                                    <div className={"col-md-6"}>
                                        <h1><i className="fas fa-crown"/></h1>
                                        İki Kat Eğlence!<br/>
                                        Konser, piknik, rakı-balık, kahve falı, yürüyüş, karaoke, paraşüt... Her ne
                                        yapmak istiyorsan
                                        birlikte yapalım, eğlenceyi ikiye katlayalım.
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </ScrollableAnchor>
                <div className={"col-md-12"}>
                    <div className={"landing_parallax"}>
                        <div className={"landing_parallax_text  col-md-12 m-auto"}>
                            Sosyal medya yalnızlaştırır!<br/>
                            Activuss sosyalleştirir.
                        </div>

                    </div>
                    <br/>
                </div>
                <ScrollableAnchor id={'howitworks'}>
                    <div className={"col-md-9 m-auto"}>
                        <div className={"col-md-12"}>
                            <h4 className={"landingTitle"}>Activuss Nasıl Çalışır?</h4>
                            <div className={"col-md-6 m-auto"}>
                                <hr/>
                            </div>
                        </div>
                        <div className={"row"}>

                            <div data-aos="flip-right" className={"col-md-6 howitworks1"}>
                                <h4><i className="far fa-play-circle"/> hareketi başlat.</h4>
                                <span className={"landingTitleCounter"}>1.</span> Bugün veya önümüzdeki günlerde ne
                                planlıyorsun,
                                paylaş.
                                <br/><br/>
                                <span className={"landingTitleCounter"}>2.</span> Planına dahil olmak isteyen insanlar
                                arasından dilediğini seç!
                            </div>
                            <div data-aos="flip-left" className={"col-md-6 howitworks2"}>
                                <h4><i className="far fa-hand-point-down"/> veya katıl.</h4>

                                <span className={"landingTitleCounter"}>1.</span> Bu akşam veya birkaç gün içinde
                                kim ne yapıyor gör!
                                <br/><br/>
                                <span className={"landingTitleCounter"}>2.</span> Dilediğin kişinin planına dahil ol!
                            </div>
                        </div>
                        <hr/>
                        <div className={"row"}>
                            <div data-aos="zoom-in-up" className={"col-md-6 text-align-left landingText"}>
                                <img className={"full-width"} src={"/img/all_birds.jpg"}/>
                            </div>
                            <div data-aos="zoom-in-up" className={"col-md-6 text-align-center landingText"}>
                                <br/>
                                <h1><i className="fab fa-angellist"/></h1>
                                <h4> Dışarıda Hayat Var!</h4><br/>
                                <a href={"/register"}>
                                    <button className={"btn btnJoin"}><h1>Hadi sen de gel</h1></button>
                                </a>
                            </div>
                        </div>
                        <hr/>
                    </div>

                </ScrollableAnchor>

                <ScrollableAnchor id={'contact'}>
                    <div className={"col-md-9 m-auto landingBottom"}>
                        <br/><br/><br/><br/>
                        <div className={"row   landingText"}>
                            <div className={"col-md-4 text-align-left"}>
                                <h5><i className="fab fa-instagram"/>/activuss</h5>
                                <h5><i className="far fa-envelope"/> mail@activuss.com</h5></div>
                            <div className={"col-md-4"}><h5>Temsilci Ol</h5><h5>Reklam Ver</h5></div>
                            <div className={"col-md-4 text-align-left"}><h5>Gizlilik Politikası</h5><h5>Kişisel Verilerin Korunması</h5></div>
                        </div>
                    </div>
                </ScrollableAnchor>

            </div>

        );
    }
}

export default Landing;
