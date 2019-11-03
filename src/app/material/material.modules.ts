import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatSliderModule, MatRadioModule } from "@angular/material";

const Material = [
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatRadioModule
]

@NgModule({
    declarations: [],
    imports: [Material],
    exports: [Material]
})
export class MaterialModule { }
