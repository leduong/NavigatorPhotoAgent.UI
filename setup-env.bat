@echo off

set APIENDPOINT=https://agent.navigatorglass.com/api/
set APIUSERMANGEMENT=https://user-management.informationcart.com/
set AUTHORITY=https://auth.informationcart.com

set NG_ENVIRONMENT=Dev
set PORT=8000

set CLIENT_ID=navigatorphotoagentui-dev
set CLIENT_SECRET=secret
set SCOPE=openid offline_access profile roles photoagentapi imagegalleryapi
set REDIRECT_URI=http://localhost:8000/index.html
set RESPONSE_TYPE=
set POST_LOGOUT_REDIRECT_URI=

set RECAPTCHA_IS_DISABLED=true
set G_RECAPTCHA=6Lfy0xMUAAAAAFl75Kn67YGjr29FB7GsZ_M1espF

@echo on
@echo. 

@echo ****** ENV Variables ******
@echo APIENDPOINT - %APIENDPOINT%
@echo APIUSERMANGEMENT - %APIUSERMANGEMENT%
@echo AUTHORITY - %AUTHORITY%
@echo. 

@echo NG_ENVIRONMENT - %NG_ENVIRONMENT%
@echo PORT - %PORT%
@echo. 

@echo CLIENT_ID - %CLIENT_ID%
@echo CLIENT_SECRET - %CLIENT_SECRET%
@echo SCOPE - %SCOPE%
@echo. 

@echo REDIRECT_URI - %REDIRECT_URI%
@echo RESPONSE_TYPE - %RESPONSE_TYPE%
@echo SCOPE - %SCOPE%
@echo POST_LOGOUT_REDIRECT_URI - %POST_LOGOUT_REDIRECT_URI%
@echo. 

@echo RECAPTCHA_IS_DISABLE - %RECAPTCHA_IS_DISABLED%
@echo G_RECAPTCHA - %G_RECAPTCHA%
@echo. 
@echo ************