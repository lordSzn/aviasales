import React, { useEffect } from 'react';
import { loadSearchIdFx } from '../api';

import { Main } from '../pages';
import { GlobalStyles } from './global-styles';

export function Application() {
  useEffect(() => {
    loadSearchIdFx();
  }, []);
  return (
    <>
      <GlobalStyles />
      <Main />
    </>
  );
}
