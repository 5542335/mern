import React from 'react';
import { shallow } from 'enzyme';

import { SimpleBackdrop } from '../BackDrop';

describe('Component: BackDrop', () => {
  describe('Test default state', () => {
    it('Should render component', () => {
      const component = shallow(<SimpleBackdrop />);

      expect(component).toMatchSnapshot();
    });

    it('Should render component with default open state === true', () => {
      const component = shallow(<SimpleBackdrop />);

      expect(component.props().open).toStrictEqual(true);
    });
  });

  describe('Test click on component', () => {
    it('Should set open to false', () => {
      const component = shallow(<SimpleBackdrop />);

      component.simulate('click');

      expect(component.props().open).toStrictEqual(false);
    });
  });
});
