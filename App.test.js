import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

// describe('<App />', () => {
//   jest.useFakeTimers();
//   it('has 1 child', () => {
//     const tree = renderer.create(<App />).toJSON();
//     expect(tree.children.length).toBe(4);
//   });
// });

// test('renders correctly', () => {
//     const tree = renderer.create(<App />).toJSON();
//     expect(tree).toMatchSnapshot();
//   });
test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  });