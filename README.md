# Serverless Stories

Serverless Stories is a static blog that is enhanced with Webtasks. It is a sample application showing how you can easily build serverless applications with [Webtask.io](https://webtask.io). Check out the blog post [here](https://auth0.com/blog/2016/06/28/building-serverless-apps-with-webtask/).

![Serverless Stories](https://cdn.auth0.com/blog/webtask/app.png)

## Running the App

1. Clone the repo
2. Install the http-server by running `npm intall http-server -g` (you will need Node and NPM)
3. Run `http-server` and navigate to `localhost:8080` to see the blog.
4. [Sign up](https://auth0.com/signup) for an Auth0 account and update the `app.js` file with your credentials.

## Deploying Webtasks

1. Install the Webtask CLI by running `npm install wt-cli -g`
2. Navigate to the `webtasks` directory
3. Run `wt init` to create your Webtask account
4. Run `wt create newsletter.js -s AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID -s AUTH0_CLIENT_SECRET=YOUR_AUTHO_CLIENT_SECRET -s AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN.auth0.com` to deploy the newsletter Webtask

```
wt create webtasks/newsletter.js \
  -s AUTH0_CLIENT_ID=6gthvmcI4Ke8uYUmpsfIpZTEzJbGsKRC \
  -s AUTH0_CLIENT_SECRET=YarlZ6aLhwSJmuQov5Ui-ZX2v8IggQQYrf_qcfEYHnwG32LvZL8BwiaMgOM21clA \
  -s AUTH0_DOMAIN=juanmaguitar.eu.auth0.com \
  -s AUTH0_SECRET_ENCODING=utf8
```

### Test

```
curl --data "email=test@demo.com" -H "Authorization: Bearer <%TOKEN%>" "Content-Type: application/json" -X "POST" https://wt-76fcf2ae5936171bf52221b4075c11a7-0.run.webtask.io/newsletter/subscribe?webtask_no_cache=1
```

