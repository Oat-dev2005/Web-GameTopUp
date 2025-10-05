import { Routes } from '@angular/router';
import { SellPage } from './pageuser/sell-page/sell-page';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Profile } from './pageuser/profile/profile';
import { Gamelibrary } from './pageuser/gamelibrary/gamelibrary';
import { Cart } from './pageuser/cart/cart';
import { Gamedetail } from './pageuser/gamedetail/gamedetail';
import { Money } from './pageuser/money/money';
import { Adminpage } from './pageadmin/adminpage/adminpage';
import { Gencode } from './pageadmin/gencode/gencode';
import { Addgame } from './pageadmin/addgame/addgame';
import { Historyuser } from './pageadmin/history/history';
import { Hisdetail } from './pageadmin/hisdetail/hisdetail';
import { AdminGuard, AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'sellpage', component: SellPage, canActivate: [AuthGuard] },
  { path: 'sellpage/:id', component: Gamedetail, canActivate: [AuthGuard] },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: Profile, canActivate: [AuthGuard] },
  { path: 'game-library', component: Gamelibrary, canActivate: [AuthGuard] },
  { path: 'cart', component: Cart, canActivate: [AuthGuard] },
  { path: 'money', component: Money, canActivate: [AuthGuard] },
  //-----------------admin-----------------
  { path: 'admin', component: Adminpage, canActivate: [AdminGuard] },
  { path: 'history', component: Historyuser, canActivate: [AdminGuard] },
  { path: 'gencode', component: Gencode, canActivate: [AdminGuard] },
  { path: 'addgame', component: Addgame, canActivate: [AdminGuard] },
  { path: 'hisdetail', component: Hisdetail, canActivate: [AdminGuard] },
];
