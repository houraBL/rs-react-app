import Header from './Header';
import { describe, it } from 'vitest';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('testBlock', () => {
  it('testName', () => {
    render(
      <Header
        onSearchSubmit={(str) => {
          console.log(str);
        }}
      />
    );
  });
});
