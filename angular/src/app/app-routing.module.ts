import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/popup',
    pathMatch: 'full'
  },
  {
    path: 'popup',
    loadChildren: () => import('./modules/popup/popup.module').then(m => m.PopupModule)
  },
  {
    path: 'options',
    loadChildren: () => import('./modules/options/options.module').then(m => m.OptionsModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
