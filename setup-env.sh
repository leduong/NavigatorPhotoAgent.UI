#!/bin/bash

export APIENDPOINT=https://agent.navigatorglass.com/api/
export APIUSERMANGEMENT=https://user-management.informationcart.com/
export AUTHORITY=https://auth.informationcart.com

export NG_ENVIRONMENT=Dev
export PORT=8000

export CLIENT_ID=navigatorphotoagentui-dev
export CLIENT_SECRET=secret
export SCOPE="openid offline_access profile roles photoagentapi imagegalleryapi"
export REDIRECT_URI=http://localhost:8000/index.html
export RESPONSE_TYPE=
export POST_LOGOUT_REDIRECT_URI=

export RECAPTCHA_IS_DISABLED=true
export G_RECAPTCHA=6Lfy0xMUAAAAAFl75Kn67YGjr29FB7GsZ_M1espF

echo -e "\n ****** ENV Variables ******"

echo APIENDPOINT - $APIENDPOINT
echo APIUSERMANGEMENT - $APIUSERMANGEMENT
echo AUTHORITY - $AUTHORITY
echo 

echo NG_ENVIRONMENT - $NG_ENVIRONMENT
echo PORT - $PORT
echo 

echo CLIENT_ID - $CLIENT_ID
echo CLIENT_SECRET - $CLIENT_SECRET
echo SCOPE - $SCOPE
echo 

echo REDIRECT_URI - $REDIRECT_URI
echo RESPONSE_TYPE - $RESPONSE_TYPE
echo SCOPE - $SCOPE
echo POST_LOGOUT_REDIRECT_URI - $POST_LOGOUT_REDIRECT_URI
echo

echo RECAPTCHA_IS_DISABLE - %RECAPTCHA_IS_DISABLED%
echo G_RECAPTCHA - %G_RECAPTCHA%

echo -e "\n************\n"
