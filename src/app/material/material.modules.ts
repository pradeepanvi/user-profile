import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatSliderModule, MatRadioModule, MatExpansionPanelTitle, MatExpansionPanelHeader, MatExpansionModule } from "@angular/material";

const Material = [
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatRadioModule,
    MatExpansionModule,
]

@NgModule({
    declarations: [],
    imports: [Material],
    exports: [Material]
})
export class MaterialModule { }
