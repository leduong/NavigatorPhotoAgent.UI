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

Formated Message (Click the Photo Link)     
http://navigatordesign.azurewebsites.net/Feed/134393416/Photos

Prerequisites
-------------

- nodejs >= 4
- npm >= 3


### Install dependencies:

> npm install

`node_modules` and `typings` directories should be created during the install.

### Set Environment 

#### Linux/Mac
```bash
export NG_ENVIRONMENT=Dev
export APIENDPOINT=https://agent.navigatorglass.com/api/
```

#### Windows CMD
```bash
set NG_ENVIRONMENT=Dev
set APIENDPOINT=https://agent.navigatorglass.com/api/
```


#### Windows Powershell
```bash
$env:NG_ENVIRONMENT = 'Dev'
$env:APIENDPOINT = 'https://agent.navigatorglass.com/api/'

Get-ChildItem Env:APIENDPOINT
```

### Build and Run with Liveload

```bash
npm run clean
npm run build
npm run serve
```

### Docker Build

```bash
docker build -t navigator-photo-agent-ui .
docker run -d -p 8000:8000 navigator-photo-agent-ui
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
