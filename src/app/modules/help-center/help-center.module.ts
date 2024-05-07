import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { HelpCenterComponent } from 'app/modules/help-center/help-center.component';
import { HelpCenterFaqsComponent } from 'app/modules/help-center/faqs/faqs.component';
import { HelpCenterGuidesComponent } from 'app/modules/help-center/guides/guides.component';
import { HelpCenterGuidesCategoryComponent } from 'app/modules/help-center/guides/category/category.component';
import { HelpCenterGuidesGuideComponent } from 'app/modules/help-center/guides/guide/guide.component';
import { HelpCenterSupportComponent } from 'app/modules/help-center/support/support.component';
import { helpCenterRoutes } from 'app/modules/help-center/help-center.routing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardModule } from '@fuse/components/card';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';


@NgModule({
    declarations: [
        HelpCenterComponent,
        HelpCenterFaqsComponent,
        HelpCenterGuidesComponent,
        HelpCenterGuidesCategoryComponent,
        HelpCenterGuidesGuideComponent,
        HelpCenterSupportComponent
    ],
    imports     : [
        RouterModule.forChild(helpCenterRoutes),
        MatButtonModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseAlertModule,
        SharedModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDividerModule,
        MatMenuModule,
        MatProgressBarModule,
        MatTooltipModule,
        FuseCardModule,
        
    ]
})
export class HelpCenterModule
{
}
