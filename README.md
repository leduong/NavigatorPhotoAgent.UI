# NavigatorPhotoAgent.UI

[![This image on DockerHub](https://img.shields.io/docker/pulls/stuartshay/navigator-photo-agent-ui.svg)](https://hub.docker.com/r/stuartshay/navigator-photo-agent-ui/)
[![dependencies Status](https://david-dm.org/leduong/NavigatorPhotoAgent.UI/status.svg)](https://david-dm.org/leduong/NavigatorPhotoAgent.UI)
 [![devDependencies Status](https://david-dm.org/leduong/NavigatorPhotoAgent.UI/dev-status.svg)](https://david-dm.org/leduong/NavigatorPhotoAgent.UI?type=dev) [![Build Status](https://travis-ci.org/stuartshay/NavigatorPhotoAgent.UI.svg?branch=master)](https://travis-ci.org/stuartshay/NavigatorPhotoAgent.UI)

## Demo
https://ui-agent.navigatorglass.com

## API Endpoint
https://agent.navigatorglass.com/swagger/ui/index.html


## Install 

Install dependencies:

```
npm install
```

Configure Environment Varibles    

#### Windows 
```
setup-env.bat
```

#### Linux/Mac 
```
./setup-env.sh
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

### Environment Variables  

```bash
export NG_ENVIRONMENT=Dev
export APIENDPOINT=https://agent.navigatorglass.com/api/
export APIUSERMANGEMENT=https://user-management.informationcart.com/

export PORT=8000
export AUTHORITY=https://auth.informationcart.com
export CLIENT_ID=navigatorphotoagentui-dev
export REDIRECT_URI=http://localhost:8000/index.html
export RESPONSE_TYPE=
export SCOPE='openid offline_access profile roles photoagentapi imagegalleryapi'
export POST_LOGOUT_REDIRECT_URI=
export CLIENT_SECRET=secret
export G_RECAPTCHA=6Lfy0xMUAAAAAFl75Kn67YGjr29FB7GsZ_M1espF

::test
export RECAPTCHA_IS_DISABLED=true
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

https://stuartshay.github.io/NavigatorPhotoAgent.UI/

```bash
export APIENDPOINT=https://agent.navigatorglass.com/api/
npm run clean
npm run build
npm run ghpage
```
