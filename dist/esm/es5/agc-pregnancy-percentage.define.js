
// AgcPregnancyPercentage: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './agc-pregnancy-percentage.core.js';
import {
  AgcPregnancyPercentage,
  AgcPregnancyPercentageInputs,
  AgcPregnancyPercentageProgress,
  AgcPregnancyPercentageResults,
  AgcPregnancyPercentageResultsPlaceholder
} from './agc-pregnancy-percentage.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    AgcPregnancyPercentage,
    AgcPregnancyPercentageInputs,
    AgcPregnancyPercentageProgress,
    AgcPregnancyPercentageResults,
    AgcPregnancyPercentageResultsPlaceholder
  ], opts);
}
