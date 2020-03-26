import React from "react";
import Person from "./Person";


class Pandemi extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            people: [],
            num: 20,
            maxHeight: window.screen.height-200,
            maxWidth: window.screen.width-200,
            point: 0,
            percent:0
        };
        if(this.props.match.params.disease === "corona"){
            this.state.doctor=5;
            this.state.contaminated=2;
            this.state.speed=80;
            this.state.change=5;
            this.state.title="Coronavirus";
        }
        if(this.props.match.params.disease === "veba"){
            this.state.doctor=4;
            this.state.contaminated=2;
            this.state.speed=60;
            this.state.change=5;
            this.state.title="Veba";

        }
        if(this.props.match.params.disease === "nezle"){
            this.state.doctor=6;
            this.state.contaminated=2;
            this.state.speed=100;
            this.state.change=5;
            this.state.title="Nezle";

        }
        let people = [];
        let top;
        let left;
        let topChange;
        let leftChange;
        let size=30;

        for (let i = 0; i < this.state.num; i++) {

            let style = "healthyPerson";
            if (i < this.state.contaminated)
                style = "sickPerson";
            if (i > this.state.contaminated && i < this.state.doctor)
                style = "doctorPerson";


            top = Math.ceil(Math.random() * 400);
            left = Math.ceil(Math.random() * 1100);
            leftChange = Math.ceil(Math.random() * this.state.change);
            topChange = Math.ceil(Math.random() * this.state.change);


            let person = {top: top, left: left, leftChange: leftChange, topChange: topChange, personStyle: style,size:size};
            people.push(person);
        }
        this.state.people = people;
        this.contamine = this.contamine.bind(this);
        this.makeDoctor = this.makeDoctor.bind(this);

    }

    componentDidMount() {
        this.move();
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

                biggerOne = Math.max(sickOnes[k].size,healthyOnes[p].size)-4;
                if (Math.abs(Math.abs(sickOnes[k].top) - Math.abs(healthyOnes[p].top)) < biggerOne && Math.abs(Math.abs(sickOnes[k].left) - Math.abs(healthyOnes[p].left)) < biggerOne) {

                    if(sickOnes[k].size<200) {
                        sickOnes[k].size = sickOnes[k].size + 5;
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

                biggerOne = Math.max(sickOnes[k].size,doctors[p].size)-4;
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



                if (top > self.state.maxHeight-newPeople[i].size*2 || top < -newPeople[i].size) {
                    topChange = self.state.people[i].topChange * (-1);
                    newPeople[i].topChange = topChange;
                }
                if (left > self.state.maxWidth-newPeople[i].size || left < 0) {
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

            }
            if (sickCount == 0) {
                alert("Oyun nitti, kazandın");
                clearInterval(intervalId);

            }
            let percent= Math.ceil(healthyCount/(healthyCount+sickCount)*100);
            self.setState({percent:percent})
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
            <div className="row outer">

                <div className={"pandemiContainer"} style={{width:this.state.maxWidth, height:this.state.maxHeight,margin:"auto"}}>
                    <div style={{width:"100%",backgroundColor:"#210f42"}}>
                        <div className="progress-bar progress-bar-striped bg-success" role="progressbar"
                             style={{width: this.state.percent + '%'}} aria-valuenow="50"
                             aria-valuemin="0" aria-valuemax="100">{this.state.percent}%
                        </div>
                    </div>
                    <h3 className={"color-white float-left"}>  {this.state.title} | {this.state.point} <i
                        className="fas fa-heartbeat"/></h3>
                    {this.state.people.map(function (p, index) {
                        return (
                            <Person key={index} onClick={() => self.makeDoctor(index)} personStyle={p.personStyle}
                                    top={p.top} left={p.left} leftChange={p.leftChange} size={p.size}
                                    topChange={p.topChange}/>);
                    })}
                </div>
            </div>
        );
    }
}


export default Pandemi;