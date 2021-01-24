import React from "react";
import PersonMobile from "./PersonMobile";
import Select from "react-select";


class PandemiMobile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            people: [],
            num: 18,
            maxHeight: window.innerHeight,
            maxWidth: window.screen.width,
            point: 0,
            title: "Coronavirus",
            difficulties: [{label: "Kolay", value: "kolay"}, {label: "Orta", value: "orta"}, {
                label: "Zor",
                value: "zor"
            }, {label:"Türkiye",value:"turkiye"}]
        };
        if (this.props.match.params.difficulty === "orta") {
            this.state.doctor = 5;
            this.state.contaminated = 2;
            this.state.speed = 120;
            this.state.change = 5;
            this.state.difficulty = {value:"orta",label:"Orta"};
        }
        if (this.props.match.params.difficulty === "zor") {
            this.state.doctor = 5;
            this.state.contaminated = 2;
            this.state.speed = 90;
            this.state.change = 5;
            this.state.difficulty = {value:"zor",label:"Zor"};

        }
        if (this.props.match.params.difficulty === "kolay") {
            this.state.doctor = 6;
            this.state.contaminated = 2;
            this.state.speed = 160;
            this.state.change = 5;
            this.state.difficulty = {value:"kolay",label:"Kolay"};

        }
        if (this.props.match.params.difficulty === "turkiye") {
            this.state.doctor = 7;
            this.state.contaminated = 5;
            this.state.speed = 70;
            this.state.change = 25;
            this.state.difficulty = {value:"turkiye",label:"Türkiye"};

        }
        let people = [];
        let top;
        let left;
        let topChange;
        let leftChange;
        let size = 20;

        for (let i = 0; i < this.state.num; i++) {

            let style = "healthyPerson";
            if (i < this.state.contaminated)
                style = "sickPerson";
            if (i > this.state.contaminated && i < this.state.doctor)
                style = "doctorPerson";


            top = Math.ceil(Math.random() * (this.state.maxWidth-40));
            left = Math.ceil(Math.random() * (this.state.maxWidth-40));
            leftChange = Math.ceil(Math.random() * this.state.change);
            topChange = Math.ceil(Math.random() * this.state.change);


            let person = {
                top: top,
                left: left,
                leftChange: leftChange,
                topChange: topChange,
                personStyle: style,
                size: size
            };
            people.push(person);
        }
        this.state.people = people;
        this.contamine = this.contamine.bind(this);
        this.makeDoctor = this.makeDoctor.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);

    }

    componentDidMount() {
        this.move();
    }

    onSelectChange(e) {
        window.location.href="https://www.activityfriend.net/corona/"+e.value;
    }

    contamine() {
        let sickOnes = [];
        let healthyOnes = [];
        let doctors = [];
        let changed = false;
        let biggerOne;
        for (let i = 0; i < this.state.num; i++) {


            if (this.state.people[i].personStyle === "sickPerson") {
                sickOnes.push(this.state.people[i]);
            } else if (this.state.people[i].personStyle === "healthyPerson") {
                healthyOnes.push(this.state.people[i]);
            } else {
                doctors.push(this.state.people[i]);
            }
        }

        for (let k = 0; k < sickOnes.length; k++) {
            for (let p = 0; p < healthyOnes.length; p++) {

                biggerOne = Math.max(sickOnes[k].size, healthyOnes[p].size) - 4;
                if (Math.abs(Math.abs(sickOnes[k].top) - Math.abs(healthyOnes[p].top)) < biggerOne && Math.abs(Math.abs(sickOnes[k].left) - Math.abs(healthyOnes[p].left)) < biggerOne) {

                    if (sickOnes[k].size < 120) {
                        sickOnes[k].size = sickOnes[k].size + 3;
                    }
                    healthyOnes[p].personStyle = "sickPerson";
                    changed = true;

                }
            }
        }
        if (changed) {
            let newPeople = sickOnes.concat(healthyOnes);
            newPeople = newPeople.concat(doctors);
            this.setState({people: newPeople});
        }
    }

    heal() {
        let sickOnes = [];
        let doctors = [];
        let healthyOnes = [];
        let changed = false;
        let biggerOne;
        for (let i = 0; i < this.state.num; i++) {


            if (this.state.people[i].personStyle === "sickPerson") {
                sickOnes.push(this.state.people[i]);
            } else if (this.state.people[i].personStyle === "doctorPerson") {
                doctors.push(this.state.people[i]);
            } else {
                healthyOnes.push(this.state.people[i]);
            }
        }

        for (let k = 0; k < sickOnes.length; k++) {
            for (let p = 0; p < doctors.length; p++) {

                biggerOne = Math.max(sickOnes[k].size, doctors[p].size) - 4;
                if (Math.abs(Math.abs(sickOnes[k].top) - Math.abs(doctors[p].top)) < biggerOne && Math.abs(Math.abs(sickOnes[k].left) - Math.abs(doctors[p].left)) < biggerOne) {
                    sickOnes[k].personStyle = "healthyPerson";
                    changed = true;
                    let point = this.state.point + 1;
                    this.setState({point: point});

                }
            }
        }

        if (changed) {
            let newPeople = sickOnes.concat(doctors);
            newPeople = newPeople.concat(healthyOnes);
            this.setState({people: newPeople});
        }
    }

    move() {
        let self = this;
        let top;
        let left;
        let topChange;
        let leftChange;
        let newPeople = [];

        let intervalId = setInterval(function () {


            for (let i = 0; i < self.state.num; i++) {


                top = self.state.people[i].top + self.state.people[i].topChange;
                left = self.state.people[i].left + self.state.people[i].leftChange;

                newPeople[i] = self.state.people[i];
                newPeople[i].top = top;
                newPeople[i].left = left;



                if (top > self.state.maxHeight - newPeople[i].size-24 || top < -24) {
                    topChange = self.state.people[i].topChange * (-1);
                    newPeople[i].topChange = topChange;
                }
                if (left > self.state.maxWidth - newPeople[i].size || left < 0) {
                    leftChange = self.state.people[i].leftChange * (-1);
                    newPeople[i].leftChange = leftChange;
                }


            }
            let healthyCount = 0;
            let sickCount = 0;
            for (let i = 0; i < self.state.num; i++) {

                if (self.state.people[i].personStyle === "sickPerson") {
                    sickCount++;

                }
                if (self.state.people[i].personStyle === "healthyPerson") {
                    healthyCount++;
                }
            }


            if (healthyCount == 0) {
                alert("Oyun bitti, kaybettin ");
                clearInterval(intervalId);
                window.location.reload();

            }
            if (sickCount == 0) {
                alert("Oyun bitti, kazandın");
                clearInterval(intervalId);
                window.location.reload();

            }
            self.setState({people: newPeople});
            self.contamine();
            self.heal();


        }, this.state.speed);
    }


    makeDoctor(index) {
        let newPeople = this.state.people;
        if (newPeople[index].personStyle !== "sickPerson") {
            for (let i = 0; i < this.state.num; i++) {
                if (newPeople[i].personStyle === "doctorPerson") {
                    newPeople[i].personStyle = "healthyPerson";
                    break;
                }
            }

            newPeople[index].personStyle = "doctorPerson";
            this.setState({people: newPeople});
        }


    }


    render() {
        //this.contamine();
        let self = this;
        return (

                <div className={"pandemiContainer"}
                     style={{width: this.state.maxWidth, height: this.state.maxHeight, margin: "auto",marginTop:0}}>


                    <div style={{width: "100px", float: "left", padding:"5px", backgroundColor:"#21136c", backgroundOpacity:0.3}}>
                        <a href={"/howToPlay/corona"}><strong style={{color:"white"}}>Nasıl Oynanır?</strong></a>

                        <Select value={this.state.difficulty} options={this.state.difficulties}
                                onChange={this.onSelectChange}/>
                        <h4 className={"color-white float-left"}> {this.state.point}
                            <i className="fas fa-heartbeat"/></h4>
                    </div>
                    {this.state.people.map(function (p, index) {
                        return (
                            <PersonMobile key={index} onClick={() => self.makeDoctor(index)} personStyle={p.personStyle}
                                    top={p.top} left={p.left} leftChange={p.leftChange} size={p.size}
                                    topChange={p.topChange}/>);
                    })}
                </div>
        );
    }
}


export default PandemiMobile;