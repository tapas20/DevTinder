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
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

- GET /user/connections
- GET /user/requests
- GET /user/feed - get you the profiles of other users on the platforms. 