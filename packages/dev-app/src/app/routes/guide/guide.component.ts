
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
    selector: 'app-guide',
    templateUrl: './guide.component.html',
    styleUrls: ['./guide.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
    SharedModule
]
})
export class GuideComponent {

}
