import { NgModel } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StarRatingComponent } from "./components/ressource-detail/StarRatingComponent";

@NgModule({
    declarations: [StarRatingComponent],
    exports: [StarRatingComponent],
    imports: [CommonModule]
  })
  export class SharedModule { }