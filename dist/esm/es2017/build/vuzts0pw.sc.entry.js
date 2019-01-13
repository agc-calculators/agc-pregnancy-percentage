/*! Built with http://stenciljs.com */
import { h } from '../agc-pregnancy-percentage.core.js';

class AgcPregnancyPercentageResultsPlaceholder {
    render() {
        const placeholder = () => h("span", null,
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }));
        return (h("section", null,
            h("ul", { class: "agc-results-placeholder" },
                h("li", null,
                    h("h2", { "data-i18n": "results.pregnancy-percentage" }, "Pregnancy Percentage"),
                    placeholder()))));
    }
    static get is() { return "agc-pregnancy-percentage-results-placeholder"; }
}

export { AgcPregnancyPercentageResultsPlaceholder };
