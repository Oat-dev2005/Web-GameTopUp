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

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'sellpage', component: SellPage },
  { path: 'sellpage/:id', component: Gamedetail },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile },
  { path: 'profile/:id', component: Profile },
  { path: 'game-library', component: Gamelibrary },
  { path: 'cart', component: Cart },
  { path: 'money', component: Money },
  //-----------------admin-----------------
  { path: 'admin', component: Adminpage },
  { path: 'history', component: Historyuser },
  { path: 'gencode', component: Gencode },
  { path: 'addgame', component: Addgame },
  { path: 'hisdetail', component: Hisdetail },
];
