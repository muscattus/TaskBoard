import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MatchingFieldsValidatorDirective } from './directives/matching-fields.directive';


@NgModule({
  declarations: [
    MatchingFieldsValidatorDirective
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  exports: [
    MatchingFieldsValidatorDirective
  ]
})
export class SharedModule { }
