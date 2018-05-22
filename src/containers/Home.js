import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import CustomSelect from '../components/CustomSelect';

@inject("store")
@observer
export default class Home extends Component {
	constructor(props) {
		super(props);
        this.store = this.props.store.appState;
	}

    componentDidMount() {
        this.store.fetchData('countries');
        this.store.fetchData('currencies');
    }

	render() {
		return (
            <div className="container">
                <div className="form">
                    <CustomSelect label="Country" searchable={true} clearable={true} />
                    <CustomSelect label="Currency" searchable={true} clearable={true} />
                </div>
            </div>
		);
	}
}
