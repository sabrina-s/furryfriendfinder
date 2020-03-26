# FurryFriendFinder

## Description
Adopt a new furry friend.

## Backend
- [x] GET /dogs to fetch all dogs
- [x] GET /users to fetch all users (admin only)
- [x] POST /users/register to create a user
- [x] POST /users/login to login as a user
- [x] GET /users/me to fetch currently logged in user
- [x] POST /users/logout
- [x] PUT /users/change_password to change
- [x] POST /dogs to add new dog
- [ ] POST /dog/adopt/:id to adopt a dog

## Frontend
Mockup: https://www.figma.com/file/eCW64W0CQ6phLzKxRwRyMT/Adoption-App?node-id=0%3A1

- [x] can view all dogs
- [x] can register new user
- [x] can login as user
- [x] can logout as user
- [x] can view own username when logged in
- [x] can change own password
- [ ] can adopt a dog

## 23 March - ...

### TODO:
- [x] users/logout backend
- [x] users/logout frontend
- [x] better error handling
- [x] test for register
- [x] users/register frontend
- [x] log user in immediately after registering
- [x] users/change_password frontend
- [x] users/change_password validation; check if user in payload matches currently logged in user
- [ ] dogs/adopt/:id backend
- [ ] dogs/adopt/:id frontend

### TOFIX:
- [x] after login successfully, navbar doesn't change to display 'username - log out' instead of 'login' immediately. it only displays when you refresh (Solution: implement UserContext)
- [x] on page first load, if user not signed in yet, error retrieving /users/me because 'no authorization token was found' (Not an issue anymore; removed /users/me after implementation of UserContext)
- [ ] UserContext retains `currentUser` data if user navigates within the page, but the context is lost if the page is refreshed.

### TODO with amanda:
- [ ] test users/logout; test that access_token is removed
- [x] test for change_password
- [x] users/login; issue with react-router `history`? see console errors.

### TODO enhancements:
- [ ] update password form should require current password and validation for it
- [ ] host images on Amazon S3
