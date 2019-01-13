
import { Component, Prop, State } from '@stencil/core';


@Component({
    tag: 'agc-pregnancy-percentage-inputs'
})
export class AgcPregnancyPercentageInputs {
    @Prop() socket: string = ""
    @State() data: any
    @State() ready: boolean = false
    section: HTMLElement;

    render() {
        return (
            <section data-wizard-results ref={c => this.section = c as HTMLElement}>
                <div style={{display: this.ready ? 'none' : 'block'}}>
                    <slot name="empty"></slot>
                </div>

                <div style={{display: this.ready ? 'block' : 'none'}}>
                    {this.data && (<ul class="agc-results">
                            <li>
                                <h2 data-i18n="results.number-pregnant">Total Females Pregnant</h2>
                                <span class="agc-results__value">{this.data['numberPregnant']}</span>
                                <sub>hd</sub>
                            </li>
                            <li>
                                <h2 data-i18n="results.number-pregnant">Total Females Exposed</h2>
                                <span class="agc-results__value">{this.data['numberExposed']}</span>
                                <sub>hd</sub>
                            </li>
                            <li>
                                <h2 data-i18n="results.females-sold-died">Total Females Sold or Died</h2>
                                <span class="agc-results__value">{this.data['femalesSoldDied']}</span>
                                <sub>hd</sub>
                            </li>
                            <li>
                                <h2 data-i18n="results.females-purchased">Total Females Purchased</h2>
                                <span class="agc-results__value">{this.data['femalesPurchased']}</span>
                                <sub>hd</sub>
                            </li>                                                      
                        </ul>)}
                </div>
            </section>
        );
    }

    handleResults(e:CustomEvent) {
        if (e.detail['socket'] !== this.socket) { return; }
        this.data = {...e.detail['results']};
        this.ready = true;
    }

    componentDidLoad() {
        // Global events allow the control to be separated from the form...
        if (!this.socket) {
            return;
        }
        window.document.addEventListener('agcCalculated', this.handleResults.bind(this));
    }

    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.handleResults);
    }
}
