import React from "react";
import { shallow } from 'enzyme';
import { Repository } from "../Repository";

describe('Component: Repository', () => {
    it('Should render Repositoty component', () => {
        const component = shallow(<Repository />);
        console.log(debug())
    })
})