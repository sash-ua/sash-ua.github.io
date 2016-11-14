import { enableProdMode } from '@angular/core';
// The browser platform with a compiler
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// The app module
import { AppModule } from "./app.module";
enableProdMode();
// Compile and launch the module
platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=main.js.map