# Vue + Facebook Login

## Set up Facebook Login

https://developers.facebook.com/

Settings -> Basic -> Add Platform

Website -> Callback URL: http://localhost:8080/auth/facebook/callback

## Warnings

`The method FB.login can no longer be called from http pages.`

https://developers.facebook.com/blog/post/2018/06/08/enforce-https-facebook-login/
You will still be able to use HTTP with “localhost” addresses, but only while your app is still in development mode.

