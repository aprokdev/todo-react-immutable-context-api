import React from 'react';
import { act, create } from 'react-test-renderer';
import Sorting from '../index';

describe('Sorting', () => {
    test('matches snapshot', () => {
        let tree;
        act(() => {
            tree = create(<Sorting dispatch={() => undefined} sortingTitle="ALPHABET" />);
        });
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
