import React from "react";
import Security from "../../../security/Security";
import Select from 'react-select'
import classnames from "classnames";
import AdminMenu from "../AdminMenu";
import SinglePhotoSelector from "../../../components/common/SinglePhotoSelector";

class BaseDiscoverForm extends React.Component {
    constructor(props) {
            super(props);
            Security.protect();

            this.state = {
                id: null,
                detail: "",
                title:"",
                photoName: null,
                savedMessage: false,
                selectedFile: null,
                isFileSelected: false,
                isSubmitDisabled: false,
                cities: [],
                city: {},
                errors: {},
                youtube:""
            };

            this.onChange = this.onChange.bind(this);
            this.handleSelectedFile = this.handleSelectedFile.bind(this);
            this.loadCities = this.loadCities.bind(this);
            this.onSelectChange = this.onSelectChange.bind(this);

    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSelectChange(e) {
        this.setState({city: e});
    }

    handleSelectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            isFileSelected: "Fotoğraf Yüklenmeye Hazır"
        })
    };


    render() {

        const {savedMessage} = this.state;
        const {errors} = this.state;
        const {photoName} = this.state;

        return (
            <div className="row adminOuter">
                <AdminMenu/>
                <div className={"col-md-6 m-auto"}>
                    <h4> Keşfet Oluştur</h4>

                    {photoName && (
                        <img className={"meetingFormPhoto"} src={"/upload/" + photoName}/>
                    )}
                    <hr/>
                    <form onSubmit={this.onSubmit}>
                        <div className={"row"}>
                            <label className={"col-md-3  text-align-left"}>
                                <i className="fas fa-map-marker"/> Şehir Filtresi:</label>
                            <div className={"col-md-9"}>
                                <Select value={this.state.city} options={this.state.cities}
                                        onChange={this.onSelectChange}/>
                            </div>
                        </div>
                        <br/>

                        <div className="form-group text-align-left">
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg")}
                                placeholder="Başlık"
                                name="title"
                                value={this.state.title}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group text-align-left">
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg")}
                                placeholder="Youtube"
                                name="youtube"
                                value={this.state.youtube}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className={"row"}>
                            <textarea
                                className={classnames("form-control form-control-lg breakLine")}
                                placeholder="detaylar"
                                name="detail"
                                value={this.state.detail}
                                onChange={this.onChange}
                            />
                        </div>


                        <hr/>
                        <SinglePhotoSelector
                            isFileSelected={this.state.isFileSelected}
                            onChange={this.handleSelectedFile}
                            error={errors.file}
                        />
                        {savedMessage && (
                            <div className={"alert alert-success"}>
                                <strong>Keşfet Yayında!</strong>
                            </div>
                        )}
                        <input
                            type="submit"
                            value="Kaydet ve Yayınla"
                            className="btn btn-primary btn-block mt-4"
                            disabled={this.state.isSubmitDisabled}
                        />
                    </form>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>

        );
    }
}


export default BaseDiscoverForm;