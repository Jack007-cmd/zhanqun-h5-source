import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameRulesPage } from './game-rules';

@NgModule({
  declarations: [
    GameRulesPage,
  ],
  imports: [
    IonicPageModule.forChild(GameRulesPage),
  ],
})
export class GameRulesPageModule {}
