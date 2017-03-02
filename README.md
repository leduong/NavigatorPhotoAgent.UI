# NavigatorPhotoAgent.UI


API Endpoint      
http://informationcart.eastus2.cloudapp.azure.com:6500/swagger/ui/index.html#/



### UI Mockup
http://navigatordesign.azurewebsites.net/Home/Feed

Formated Message (Click the Photo Link)     
http://navigatordesign.azurewebsites.net/Feed/134393416/Photos


### Init first

```
npm i
```

### Set Environment and Run with Dev

```bash
export NG_ENVIRONMENT=Dev
export APIENDPOINT=http://informationcart.eastus2.cloudapp.azure.com:6500/api/
npm run clean
npm run build
npm start
```

### Build to Github Page

http://stuartshay.github.io/NavigatorPhotoAgent.UI/

```bash
export APIENDPOINT=http://informationcart.eastus2.cloudapp.azure.com:6500/api/
npm run clean
npm run build
npm run ghpage
```
