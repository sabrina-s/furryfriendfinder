# FurryFriendFinder

## Description
Adopt a new furry friend.

## Backend
- GET / to view all dogs in the database
- POST /users to create a user
- POST /dog/:dogId to adopt a dog

## Frontend
- https://www.figma.com/file/eCW64W0CQ6phLzKxRwRyMT/Adoption-App?node-id=0%3A1

# Blockers

### Heroku deployment (resolved)

Update 20/02: Resolved by removing `mars/create-react-app-buildpack` buildpack from Heroku. 🤡

**Errors encountered:**

It looks like Heroku is looking into `/app/build/...` instead of `/client/build/...`.

1. Heroku app:

```
Error 404 nginx
GET https://spotifind-sabrina.herokuapp.com/favicon.ico 404 (Not Found)
```

2. `heroku run bash`

```
ls: cannot access '/app/build/static/js/*.js': No such file or directory
Error injecting runtime env: bundle not found '/app/build/static/js/*.js'. See: https://github.com/mars/create-react-app-buildpack/blob/master/README.md#user-content-custom-bundle-location
```

3. `heroku logs -t`

```
ls: cannot access '/app/build/static/js/*.js': No such file or directory
```

And after attempting fix #3 (adding `JS_RUNTIME_TARGET_BUNDLE` config var, as suggested in https://github.com/mars/create-react-app-buildpack/blob/master/README.md#user-content-custom-bundle-location):

```
ls: cannot access '/client/build/static/js/*.js': No such file or directory
```

**Fixes tried:**
Solutions found from various sources with Google.

1. Fixing paths

```
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
```

```
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}
```

```
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
```

2. Adding *heroku-postbuild* script in server `package.json`

```
"heroku-postbuild": "cd client && npm install && npm install && npm run build"
```

```
"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
```

3. Added config var `JS_RUNTIME_TARGET_BUNDLE: /client/build/static/js/*.js`
4. Declared node version in `package.json`
5. Removed `/build` from client's `.gitignore` (reverted)
