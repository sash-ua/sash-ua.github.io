// import { enableProdMode } from '@angular/core';
// import { platformBrowser }    from '@angular/platform-browser';
// import {AppModuleNgFactory} from "./app/app.module.ngfactory";
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)
//     .then(success => console.log(`Bootstrap success`))
//     .catch(error => console.log(error));
//
// enableProdMode();
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from "./app/app.module.ngfactory";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
//# sourceMappingURL=main.js.map