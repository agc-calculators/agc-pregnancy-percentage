
import { Component, State, Event, EventEmitter, Prop } from '@stencil/core';
import { validate, round } from '../../utils'

@Component({
    tag: 'agc-pregnancy-percentage'
})
export class AgcPregnancyPercentage {

    @Prop() socket: string = ""
    @Prop() tract: string = ""
    @Prop() mode: 'full' | 'step' = 'step'
    @State() currentStep = 0
    @State() cache = {}
    @State() submitted = false
    @State() results = {}
    @Event({
        eventName: 'agcCalculated'
      }) agcCalculated: EventEmitter;
    @Event({
        eventName: 'agcStepChanged'
    }) agcStepChanged: EventEmitter;

    form: HTMLFormElement

    render() {
        return (
            <div>
                <form onSubmit={(e) => e.preventDefault()} ref={c => this.form = c as HTMLFormElement} data-wizard="agc-pregnancy-percentage" 
                    data-wizard-mode={this.mode}
                    class="agc-wizard">
                    <slot></slot>
                    <section data-wizard-section="1">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.number-pregnant">Total Females Pregnant</label>
                            <input name="numberPregnant" type="number" min="1" step="1" required />
                            <p class="agc-wizard__validation-message" data-i18n="validation.number-pregnant.required" data-validates="numberPregnant">Please enter a whole number of 1 or more.</p>
                            <p data-i18n="hints.number-pregnant">⮤ Enter the total number of pregnant females.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>}
                        </div>
                    </section>
                    <section data-wizard-section="2">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.number-exposed">Total Females Exposed</label>
                            <input name="numberExposed" type="number" min="1" step="1" required />
                            <p class="agc-wizard__validation-message" data-i18n="validation.number-exposed.required" data-validates="numberExposed">Please enter a whole number of 1 or more.</p>
                            <p data-i18n="hints.number-exposed">⮤ Enter the total number of females exposed to breeding.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && [<button class="agc-wizard__actions-prev" data-i18n="actions.prev" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>,
                            <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>]}
                        </div>
                    </section>
                    <section data-wizard-section="3">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.females-sold-died">Total Females Sold or Died</label>
                            <input name="femalesSoldDied" type="number" min="0" step="1" required />
                            <p class="agc-wizard__validation-message" data-i18n="validation.females-sold-died.required" data-validates="femalesSoldDied">Please enter a whole number of 0 or more.</p>
                            <p data-i18n="hints.females-sold-died">⮤ Enter the total number of females that were sold or died.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && [<button class="agc-wizard__actions-prev" data-i18n="actions.prev" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>,
                            <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>]}
                        </div>
                    </section>
                    <section data-wizard-section="4">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.females-purchased">Total Females Purchased</label>
                            <input name="femalesPurchased" type="number" min="0" step="1" required />
                            <p class="agc-wizard__validation-message" data-i18n="validation.females-purchased.required" data-validates="femalesPurchased">Please enter a whole number of 0 or more.</p>
                            <p data-i18n="hints.females-purchased">⮤ Enter the total number of females that were purchased and added to the herd.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-prev" data-i18n="actions.prev" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>}
                            <button class="agc-wizard__actions-next" data-i18n="actions.finish" onClick={this.nextPrev.bind(this, this.mode === 'step' ? 1 : 4)}>Calculate 🠖</button>
                        </div>
                    </section>
                    <section data-wizard-results>                        
                        <slot name="results"></slot>                     
                    </section>
                </form>
            </div>
        );
    }

    showTab(n) {
        // This function will display the specified section of the form... 
        if (this.mode === 'step') {       
            this.cache['sections'][n].style.display = "block";
        }

        if (this.socket) {
            this.agcStepChanged.emit({socket: this.socket, tract: this.tract, step: this.currentStep})
        }
    }

    reset() {
        this.currentStep = 0
        this.submitted = false
        this.showTab(0)
    }

    validateForm () {
        let valid = true;

        if (this.currentStep === 0 || this.mode === 'full') {
            if (!validate(this.form, 'numberPregnant')) {
                valid = false
            }
        }
        
        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'numberExposed')) {
                valid = false
            }
        }

        if (this.currentStep === 2 || this.mode === 'full') {
            if (!validate(this.form, 'femalesSoldDied')) {
                valid = false
            }
        }

        if (this.currentStep === 3 || this.mode === 'full') {
            if (!validate(this.form, 'femalesPurchased')) {
                valid = false
            }
        }

        return valid;
    }

    nextPrev(n, e) {
        e && e.preventDefault()
        if (this.mode === 'full') {
            if (!this.validateForm()) return false
        } else if (n == 1 && !this.validateForm()) return false

        // Hide the current tab:
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none"
        }
        // Increase or decrease the current tab by 1:
        this.currentStep = this.currentStep + n
        // if you have reached the end of the form...
        if (this.currentStep >= this.cache['sections'].length) {
            // ... the form gets submitted:
            this.submitted = true
            this.showResults.call(this);
            return false;
        }
        // Otherwise, display the correct tab:
        this.showTab.call(this, this.currentStep);
    }

    showResults() {
        let numberPregnant =  parseInt((this.form.querySelector('[name="numberPregnant"') as HTMLInputElement).value)        
        let numberExposed =  parseInt((this.form.querySelector('[name="numberExposed"') as HTMLInputElement).value)        
        let femalesSoldDied =  parseInt((this.form.querySelector('[name="femalesSoldDied"') as HTMLInputElement).value)        
        let femalesPurchased =  parseInt((this.form.querySelector('[name="femalesPurchased"') as HTMLInputElement).value)        

        let totalFemales = numberExposed - femalesSoldDied + femalesPurchased
        let pregnancyPercentage = round((numberPregnant / totalFemales) * 100, 2)

        let results = {
            socket: this.socket,
            tract: this.tract,
            numberPregnant,
            numberExposed,
            femalesSoldDied,
            femalesPurchased,
            totalFemales,
            pregnancyPercentage,
            calculated: new Date()
        }

        if (this.socket) {
            this.agcCalculated.emit({socket: this.socket, tract: this.tract, results: {...results}})
        }

        this.results = {...results}
        
        this.cache['results'].forEach(result => {
            result.style.display = 'block'
        })
    }

    handleAction(e:CustomEvent) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }

    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c as any).map(c => c as HTMLElement)
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c as any).map(c => c as HTMLElement)
        this.cache = {...this.cache, sections: sections, results: results}

        window.document.addEventListener('agcAction', this.handleAction.bind(this));

        (this.form.querySelector('[name="femalesSoldDied"]') as HTMLInputElement)!.defaultValue = '0';
        (this.form.querySelector('[name="femalesPurchased"]') as HTMLInputElement)!.defaultValue = '0';

        this.showTab(0)
    }

    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
}