System.config({
    defaultJSExtensions: true,
    paths: {
        // paths serve as alias
        'libs:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
        // our app is within the app folder
        app: '.tmp/src/app',

        // angular bundles
        '@angular/core': 'libs:@angular/core/bundles/core.umd.js',
        '@angular/common/http': 'node_modules/@angular/common/bundles/common-http.umd.js',
        '@angular/common': 'libs:@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'libs:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'libs:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'libs:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'libs:@angular/http/bundles/http.umd.js',
        '@angular/router': 'libs:@angular/router/bundles/router.umd.js',
        '@angular/forms': 'libs:@angular/forms/bundles/forms.umd.js',
        '@angular/upgrade': 'libs:@angular/upgrade/bundles/upgrade.umd.js',
        '@angular/core/src/facade/lang': 'libs:@angular/core/src/facade/lang.js',
        // other libraries
        'rxjs': 'libs:rxjs',
        'angular2-in-memory-web-api': 'libs:angular2-in-memory-web-api',
        'jquery': 'libs:jquery/dist/jquery.js',
        'jquery.browser': 'libs:jquery.browser/dist/jquery.browser.js',
        'screenfull': 'libs:screenfull/dist/screenfull.js',
        'ngx-infinite-scroll': 'libs:ngx-infinite-scroll/ngx-infinite-scroll.js',
        // 'angular2-infinite-scroll': 'libs:angular2-infinite-scroll/angular2-infinite-scroll.js',
        // 'ng2-dnd': 'libs:ng2-dnd/index.js',
        // 'angular2-toaster': 'libs:angular2-toaster',
        // 'angular2-google-maps': 'libs:angular2-google-maps/core/index.js',
        
        // 'ng2-bootstrap': 'libs:ng2-bootstrap'
        // 'ng2-table': 'libs:ng2-table',
        'ng2-ace-editor': 'libs:ng2-ace-editor',
        'brace': 'libs:brace',
        'moment': 'libs:moment',
        'ngx-bootstrap': 'libs:ngx-bootstrap',
        'plugin-babel': 'libs:systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'libs:systemjs-plugin-babel/systemjs-babel-browser.js',
        'angular-oauth2-oidc': 'libs:angular-oauth2-oidc',
        'jsrsasign': 'libs:jsrsasign/lib',
        'tslib': 'libs:tslib'
    },
    transpiler: 'plugin-babel',
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
        app: { main: 'main.js', defaultExtension: 'js' },
        rxjs: { defaultExtension: 'js' },
        /*
        'ngx-bootstrap/collapse': { main: 'index.js', defaultExtension: 'js' },
        'ngx-bootstrap/datepicker': { main: 'index.js', defaultExtension: 'js' },
        'ngx-bootstrap/pagination': { main: 'index.js', defaultExtension: 'js' },
        'ngx-bootstrap/modal': { main: 'index.js', defaultExtension: 'js' },
        'ngx-bootstrap/positioning': { main: 'index.js', defaultExtension: 'js' },
        'ngx-bootstrap/component-loader': { main: 'index.js', defaultExtension: 'js' },
        */
        'angular2-in-memory-web-api': { main: './index.js', defaultExtension: 'js' },
        'ng2-ace-editor': { main: 'index.js', defaultExtension: 'js' },
        'brace': { main: 'index.js', defaultExtension: 'js' },
        "rxjs/operators": { main: "index.js", defaultExtension: "js" },
        'moment': { main: 'moment.js', defaultExtension: 'js' },
        'ngx-bootstrap': { format: 'cjs', main: 'bundles/ngx-bootstrap.umd.js', defaultExtension: 'js' },
        'angular-oauth2-oidc': {
            main: 'angular-oauth2-oidc.umd.js',
            format: 'cjs',
            defaultExtension: 'js',
            map: { 'jsrsasign': 'libs:jsrsasign/lib/jsrsasign', },
            meta: { 'angular-oauth2-oidc': { deps: ['require', 'jsrsasign'] }, }
        },
        'jsrsasign': { main: 'jsrsasign.js', defaultExtension: 'js' },
        'tslib': { main: 'tslib.js', defaultExtension: 'js' }
    }
});
