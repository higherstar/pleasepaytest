import {observable, action, autorun, extendObservable, toJS} from "mobx";
import axios from "axios";
import {createModelSchema, primitive, list, object, serialize, deserialize} from "serializr";

class State {
    countries = [];
    currencies = [];
    selectedCountry = null;
    selectedCurrency = null;
}

class Country {
    id = '';
    value = '';
    label = '';
    currency = '';
}

class Currency {
    id = '';
    value = '';
    label = '';
}

function autoSave(store, save) {
    let firstRun = true;
    autorun(() => {
        // Create model schemas
        createModelSchema(Country, {
            id: primitive(),
            value: primitive(),
            label: primitive(),
            currency: primitive()
        });

        createModelSchema(Currency, {
            id: primitive(),
            value: primitive(),
            label: primitive()
        });

        createModelSchema(State, {
            countries: list(object(Country)),
            currencies: list(object(Currency)),
            selectedCountry: primitive(),
            selectedCurrency: primitive()
        });

        // This code will run every time any observable property
        // on the store is updated.

        const data = deserialize(State, toJS(store));
        console.log(data);
        const json = JSON.stringify(serialize(data));

        if (!firstRun) {
            save(json);
        }
        firstRun = false;
    });
}

export default class AppState {
    @observable countries;
    @observable currencies;
    @observable selectedCountry;
    @observable selectedCurrency;

    constructor() {
        this.countries = [];
        this.currencies = [];
        this.selectedCountry = null;
        this.selectedCurrency = null;

        this.load();
        autoSave(this, this.save.bind(this));
    }

    async fetchData(pathname) {
        let {data} = await axios.get(
            `https://api.pleasepay.co.uk/${pathname}`
        );

        this.setData(pathname, data);
    }

    @action setData(pathname, data) {
        if (pathname === 'countries') {
            this.countries = data.items.map(item => ({
                id: item._id,
                value: item.translations.en.replace(/ /g, "-").toLowerCase(),
                label: item.translations.en,
                currency: item.preferredCurrency.name,
                // ...item
            }));
        } else if (pathname === 'currencies') {
            this.currencies = data.items.map(item => ({
                id: item._id,
                value: item.translations.en,
                label: item.translations.en,
                // ...item
            }));
        }
    }

    @action selectCountry(country) {
        this.selectedCountry = country;

        if (country) {
            const countryIndex = this.countries.findIndex(country => country.value === this.selectedCountry);
            this.selectedCurrency = this.countries[countryIndex].currency;
        } else {
            this.selectedCurrency = null;
        }
    }

    @action selectCurrency(currency) {
        this.selectedCurrency = currency;
    }

    @action load() {
        if (localStorage.getItem('pleasepaytest')) {
            const data = localStorage.getItem('pleasepaytest');

            extendObservable(this, JSON.parse(data));
        }
    }

    @action save(json) {
        localStorage.setItem('pleasepaytest', json);
    }
}
