import React, {Component} from "react";
import Select from "react-select";
import {inject, observer} from "mobx-react";

import "react-select/dist/react-select.css";

@inject("store")
@observer
class CustomSelect extends Component {
    constructor(props) {
        super(props);

        this.store = this.props.store.appState;

        this.state = {
            country: 'AU',
            disabled: false,
            searchable: this.props.searchable,
            clearable: this.props.clearable,
            rtl: false,
        };

        this.updateValue = this.updateValue.bind(this);
    }

    updateValue(newValue) {
        if (this.props.label === 'Country') {
            this.store.selectCountry(newValue);
        } else {
            this.store.selectCurrency(newValue);
        }
    }

    render() {
        let options = [];
        let value = '';
        let {label} = this.props;
        if (label === 'Country') {
            options = this.store.countries;
            value = this.store.selectedCountry;
        } else if (label === 'Currency') {
            options = this.store.currencies;
            value = this.store.selectedCurrency;
        }

        return (
            <div className="selector">
                <div className="label-area">
                    <span>{label}</span>
                </div>
                <div className="select-area">
                    <Select
                        id="state-select"
                        name="selected-state"
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        autoFocus
                        options={options}
                        simpleValue
                        disabled={this.state.disabled}
                        value={value}
                        onChange={this.updateValue}
                        rtl={this.state.rtl}
                        searchable={this.state.searchable}
                        clearable={this.state.clearable}
                    />
                </div>
            </div>
        );
    }
}

export default CustomSelect;