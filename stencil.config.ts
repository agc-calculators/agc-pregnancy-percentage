import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'agc-pregnancy-percentage',
  outputTargets:[
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  globalStyle: 'src/globals/app.css'
};

