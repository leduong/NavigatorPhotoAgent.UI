# NavigatorPhotoAgent.UI

[![This image on DockerHub](https://img.shields.io/docker/pulls/stuartshay/navigator-photo-agent-ui.svg)](https://hub.docker.com/r/stuartshay/navigator-photo-agent-ui/)
[![dependencies Status](https://david-dm.org/stuartshay/NavigatorPhotoAgent.UI/status.svg)](https://david-dm.org/stuartshay/NavigatorPhotoAgent.UI)
 [![devDependencies Status](https://david-dm.org/stuartshay/NavigatorPhotoAgent.UI/dev-status.svg)](https://david-dm.org/stuartshay/NavigatorPhotoAgent.UI?type=dev) [![Build Status](https://travis-ci.org/stuartshay/NavigatorPhotoAgent.UI.svg?branch=master)](https://travis-ci.org/stuartshay/NavigatorPhotoAgent.UI)

### Demo   
```
https://ui-agent.navigatorglass.com     
https://stuartshay.github.io/NavigatorPhotoAgent.UI/

L: Frank
P: password
```

### API Endpoint      
https://agent.navigatorglass.com/swagger/ui/index.html

### UI Mockup
http://navigatordesign.azurewebsites.net/Home/Feed

### angular-oauth2-oidc 
https://github.com/manfredsteyer/angular-oauth2-oidc

### Install dependencies:

> npm install

`node_modules` and `typings` directories should be created during the install.

### Set Environment 

#### Linux/Mac
```bash
export NG_ENVIRONMENT=Dev
export APIENDPOINT=https://agent.navigatorglass.com/api/
export APIUSERMANGEMENT=https://user-management.informationcart.com/

export PORT=8000
export AUTHORITY=https://auth.informationcart.com
export CLIENT_ID=navigatorphotoagentui-dev
export REDIRECT_URI=http://localhost:8000/index.html
export RESPONSE_TYPE=
export SCOPE=openid offline_access profile roles photoagentapi imagegalleryapi
export POST_LOGOUT_REDIRECT_URI=
export CLIENT_SECRET=secret
export G_RECAPTCHA=6Lfy0xMUAAAAAFl75Kn67YGjr29FB7GsZ_M1espF
```


#### Windows CMD
```bash
set NG_ENVIRONMENT=Dev
set APIENDPOINT=https://agent.navigatorglass.com/api/
set APIUSERMANGEMENT=https://user-management.informationcart.com/

set PORT=8000
set AUTHORITY=https://auth.informationcart.com
set CLIENT_ID=navigatorphotoagentui-dev
set REDIRECT_URI=http://localhost:8000/index.html
set RESPONSE_TYPE=
set SCOPE=openid offline_access profile roles photoagentapi imagegalleryapi
set POST_LOGOUT_REDIRECT_URI=
set CLIENT_SECRET=secret
set G_RECAPTCHA=6Lfy0xMUAAAAAFl75Kn67YGjr29FB7GsZ_M1espF
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
http://localhost:8000

L: Frank
P: password
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
