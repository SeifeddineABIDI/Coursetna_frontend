import { NgModel } from "@angular/forms";
import { StarRatingComponent } from "./components/ressource-detail/StarRatingComponent";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [StarRatingComponent],
    exports: [StarRatingComponent],
    imports: [CommonModule]
  })
  export class SharedModule { }