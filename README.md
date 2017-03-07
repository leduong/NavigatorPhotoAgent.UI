# NavigatorPhotoAgent.UI


API Endpoint      
http://informationcart.eastus2.cloudapp.azure.com:6500/swagger/ui/index.html#/


### UI Mockup
http://navigatordesign.azurewebsites.net/Home/Feed

Formated Message (Click the Photo Link)     
http://navigatordesign.azurewebsites.net/Feed/134393416/Photos

### Prereq
nodejs version: 6.x   
gulp
typings 
npm3



### Init first

```bash
npm i
```

### Set Environment 

#### Linux/Mac
```bash
export NG_ENVIRONMENT=Dev
export APIENDPOINT=http://informationcart.eastus2.cloudapp.azure.com:6500/api/
```

#### Windows CMD
```bash
set NG_ENVIRONMENT=Dev
set APIENDPOINT=http://informationcart.eastus2.cloudapp.azure.com:6500/api/
```


#### Windows Powershell
```bash
$env:NG_ENVIRONMENT = 'Dev'
$env:APIENDPOINT = 'http://informationcart.eastus2.cloudapp.azure.com:6500/api/'

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

http://stuartshay.github.io/NavigatorPhotoAgent.UI/

```bash
export APIENDPOINT=http://informationcart.eastus2.cloudapp.azure.com:6500/api/
npm run clean
npm run build
npm run ghpage
```
