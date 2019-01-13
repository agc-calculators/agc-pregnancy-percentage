
import { Component } from '@stencil/core';


@Component({
    tag: 'agc-pregnancy-percentage-results-placeholder'
})
export class AgcPregnancyPercentageResultsPlaceholder {

    

    render() {
        const placeholder = () => <span><i class="mark"></i> <i class="mark"></i> <i class="mark"></i> <i class="mark"></i></span>

        return (
            <section>
                <ul class="agc-results-placeholder">
                    <li>
                        <h2 data-i18n="results.pregnancy-percentage">Pregnancy Percentage</h2>
                        {placeholder()}
                    </li>                                      
                </ul>
            </section>
        );
    }
}