import React from "react";


class HowToPlay extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (<div style={{margin:"auto", width:700}}>
            Siyah toplar hastaları, beyaz toplar sağlıklıları, yeşil toplar doktorları temsil eder. Hastalar sağlıklı olanlara dokunursa hastalığı bulaştırır, doktorlar hastalara dokunursa iyileştirir.
            <br/>Doktor sayısı sabittir, hasta sayısı hastalık bulaştıkça artar
            <br/>Herhangi <strong>beyaz bir topa tıklayarak</strong> onu doktor yapabilirsin. Amaç, doktorları doğru yere göndererek tüm hastaları(siyahları) iyileştirmek.<br/><br/>
            Touchpad ile oynamak pek kolay değil, mouse kullanmalısın.
            <h2><a href={"/corona/orta"}>OYUNA DÖN</a></h2>
        </div>)
    }
}


export default HowToPlay;

