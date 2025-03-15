# Api Lists

authRouter
- POST /signup
- POST /signin
- POST /logout

profile router
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

connectionRequestRouter
- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

- GET /user/requests/received
- GET /user/connections
- GET /user/feed - get you the profiles of other users on the platforms. 