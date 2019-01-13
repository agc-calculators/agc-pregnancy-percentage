export class AgcPregnancyPercentageInputs {
    constructor() {
        this.socket = "";
        this.ready = false;
    }
    render() {
        return (h("section", { "data-wizard-results": true, ref: c => this.section = c },
            h("div", { style: { display: this.ready ? 'none' : 'block' } },
                h("slot", { name: "empty" })),
            h("div", { style: { display: this.ready ? 'block' : 'none' } }, this.data && (h("ul", { class: "agc-results" },
                h("li", null,
                    h("h2", { "data-i18n": "results.number-pregnant" }, "Total Females Pregnant"),
                    h("span", { class: "agc-results__value" }, this.data['numberPregnant']),
                    h("sub", null, "hd")),
                h("li", null,
                    h("h2", { "data-i18n": "results.number-pregnant" }, "Total Females Exposed"),
                    h("span", { class: "agc-results__value" }, this.data['numberExposed']),
                    h("sub", null, "hd")),
                h("li", null,
                    h("h2", { "data-i18n": "results.females-sold-died" }, "Total Females Sold or Died"),
                    h("span", { class: "agc-results__value" }, this.data['femalesSoldDied']),
                    h("sub", null, "hd")),
                h("li", null,
                    h("h2", { "data-i18n": "results.females-purchased" }, "Total Females Purchased"),
                    h("span", { class: "agc-results__value" }, this.data['femalesPurchased']),
                    h("sub", null, "hd")))))));
    }
    handleResults(e) {
        if (e.detail['socket'] !== this.socket) {
            return;
        }
        this.data = Object.assign({}, e.detail['results']);
        this.ready = true;
    }
    componentDidLoad() {
        if (!this.socket) {
            return;
        }
        window.document.addEventListener('agcCalculated', this.handleResults.bind(this));
    }
    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.handleResults);
    }
    static get is() { return "agc-pregnancy-percentage-inputs"; }
    static get properties() { return {
        "data": {
            "state": true
        },
        "ready": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        }
    }; }
}
