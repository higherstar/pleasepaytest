import React from 'react';
import {shallow} from 'enzyme';

import CustomSelect from '../../src/components/CustomSelect';

describe('CustomSelect component', () => {
    let component;
    let store;

    beforeEach(() => {
        store = {
            countries: [
                {currency: "SEK", id: "58f9f682d86a9551bbffeaa8", label: "Sweden", value: "sweden"},
                {currency: "NZD", id: "58f9f682d86a9551bbffeab6", label: "New Zealand", value: "new-zealand"},
                {currency: "EUR", id: "58f9f682d86a9551bbffea9d", label: "Netherlands", value: "netherlands"},
                {currency: "EUR", id: "58f9f682d86a9551bbffea92", label: "Austria", value: "austria"},
            ],
            currencies: [
                {id: "58f9f682d86a9551bbffeadb", value: "MXN", label: "MXN"},
                {id: "58f9f682d86a9551bbffeadc", value: "NZD", label: "NZD"},
                {id: "58f9f682d86a9551bbffeae3", value: "RUB", label: "RUB"},
                {id: "58f9f682d86a9551bbffead6", value: "AUD", label: "AUD"}
            ],
            selectedCountry: "new-zealand",
            selectedCurrency: "NZD"
        };
        component = shallow(
            <CustomSelect
                store={store}
                label="Country"
                searchable={true}
                clearable={true} />
        );
    });

    test('Render', () => {
        expect(component).toMatchSnapshot();
    });


    test('render Markdown in preview mode', () => {
        const wrapper = shallow(
            <CustomSelect
                store={store}
                label="Country"
                searchable={true}
                clearable={true} />
        );

        expect(wrapper).toMatchSnapshot();

        wrapper.find('[class="Select-control"]').simulate('click');

        expect(wrapper).toMatchSnapshot();
    });

})

