# NavigatorPhotoAgent.UI

[![This image on DockerHub](https://img.shields.io/docker/pulls/stuartshay/navigator-photo-agent-ui.svg)](https://hub.docker.com/r/stuartshay/navigator-photo-agent-ui/)
[![dependencies Status](https://david-dm.org/stuartshay/NavigatorPhotoAgent.UI/status.svg)](https://david-dm.org/stuartshay/NavigatorPhotoAgent.UI)
 [![devDependencies Status](https://david-dm.org/stuartshay/NavigatorPhotoAgent.UI/dev-status.svg)](https://david-dm.org/stuartshay/NavigatorPhotoAgent.UI?type=dev) [![Build Status](https://travis-ci.org/stuartshay/NavigatorPhotoAgent.UI.svg?branch=master)](https://travis-ci.org/stuartshay/NavigatorPhotoAgent.UI)

### Demo     
https://ui-agent.navigatorglass.com     
https://stuartshay.github.io/NavigatorPhotoAgent.UI/

### API Endpoint      
https://agent.navigatorglass.com/swagger/ui/index.html

### UI Mockup
http://navigatordesign.azurewebsites.net/Home/Feed

### angular-oauth2-oidc 
https://github.com/manfredsteyer/angular-oauth2-oidc#sample-auth-server


### Install dependencies:

> npm install

`node_modules` and `typings` directories should be created during the install.

### Set Environment 

#### Linux/Mac
```bash
export NG_ENVIRONMENT=Dev
export APIENDPOINT=https://agent.navigatorglass.com/api/
export APIUSERMANGEMENT=https://user-management.informationcart.com/

export PORT=4200
export AUTHORITY=https://steyer-identity-server.azurewebsites.net/identity
export CLIENT_ID=demo-resource-owner
export REDIRECT_URI=http://localhost:4200/index.html
export RESPONSE_TYPE=
export SCOPE=openid profile email voucher
export POST_LOGOUT_REDIRECT_URI=
export CLIENT_SECRET=geheim
export G_RECAPTCHA=6Lfy0xMUAAAAAFl75Kn67YGjr29FB7GsZ_M1espF


::test
export RECAPTCHA_IS_DISABLED=true

```


#### Windows CMD
```bash
set NG_ENVIRONMENT=Dev
set APIENDPOINT=https://agent.navigatorglass.com/api/
set APIUSERMANGEMENT=https://user-management.informationcart.com/

set PORT=4200
set AUTHORITY=https://steyer-identity-server.azurewebsites.net/identity
set CLIENT_ID=demo-resource-owner
set REDIRECT_URI=http://localhost:4200/index.html
set RESPONSE_TYPE=
set SCOPE=openid profile email voucher
set POST_LOGOUT_REDIRECT_URI=
set CLIENT_SECRET=geheim
set G_RECAPTCHA=6Lfy0xMUAAAAAFl75Kn67YGjr29FB7GsZ_M1espF


::test
set RECAPTCHA_IS_DISABLED=true
```

#### Windows Powershell
```bash
$env:NG_ENVIRONMENT = 'Dev'
$env:APIENDPOINT = 'https://agent.navigatorglass.com/api/'

Get-ChildItem Env:APIENDPOINT
```

### Build and Run 

```bash
npm run clean
npm run build
npm start
```

```
http://localhost:4200

Login: max
Password:geheim
```


### Docker Build

```bash
docker build -t navigator-photo-agent-ui .
docker run -d -p 8000:8000 navigator-photo-agent-ui
```

### Docker Run

```bash
docker run -d -t -i -p 8000:8000 \ 
-e APIENDPOINT='https://agent.navigatorglass.com/api/' \
-e AUTHORITY='https://auth.informationcart.com' \
--name navigator-photo-agent-ui  stuartshay/navigator-photo-agent-ui:node8-44
```


#### Tag & Push to Docker Hub
```bash
docker tag <imageid> navigator-photo-agent-ui:staging
docker tag navigator-photo-agent-ui:staging  stuartshay/navigator-photo-agent-ui:staging

docker push stuartshay/navigator-photo-agent-ui:staging
```

### Build and Deploy to Github Pages

```bash
export APIENDPOINT=https://agent.navigatorglass.com/api/
npm run clean
npm run build
npm run ghpage
```


### Test Auth Enviroment

```bash
set APIENDPOINT=https://agent.navigatorglass.com/api/

set PORT=4200
set AUTHORITY=https://steyer-identity-server.azurewebsites.net/identity
set CLIENT_ID=spa-demo
set REDIRECT_URI=http://localhost:4200/index.html
set RESPONSE_TYPE=
set SCOPE=openid profile email voucher
set POST_LOGOUT_REDIRECT_URI=
```
