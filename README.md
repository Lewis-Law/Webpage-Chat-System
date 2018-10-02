# Assignment 2
Git hub clone link: https://github.com/s5052799/assignment2.git

# How to start the application
To start the server: “cd server” then “node server.js” (port 3000)
To start the client: “ng serve” (port 4200)
The front page of the website is http://localhost:4200/login  any other pages will redirect you back to this page if you are not logged in.

# Structure of repository and version control
There is only the master origin in the repository.
Similarly to workshop 6 activity, I have separated the server into a server folder. The application must have both server and client running at the same time to access full functionality. 
Each time I finish milestone of functions I will commit and push my code to the master branch with commit messages.
I also use other branches to implement functions that I am unsure of, therefore I can revert my changes back to the master branch.

# Data Structure
The data of the application are stored in the mongoDB server as json files. There are 2 tables of data User and Group.

User:
User data are stored in a collection called ‘users’. It consist of attributes: name(username), email, role, password, image.

Group:
Group data are stored in a collection called ‘groups’. It consist of 3 attributes: name(name of group), user(users within the group), channel(consist of 2 attributes).

Channel:
Channel data is stored within group data, with 2 attributes: name(name of channel) and users(users within the channel) 

# REST API, routes, parameters and return values
The REST API I used consist of routes that are separated into 3 main parts. User, group and channel (within group directory). Also an additional route for uploading images.

# User (5 routes): 
authUser.js (used for log in authorisation)
access through http://localhost:3000/api/user/auth
Method: POST
Requested variables:
•	Username
•	Password
If username exist:
•	response with, username and success: true
If username does not exist:
•	respond with success: false

registerUser.js (used for creating a user)
access through http://localhost:3000/api/user/reg
Method: POST
Requested variables:
•	username
•	password
•	email
•	role
If username does not exist
•	a user with the above attributes and default images will be added to collection ‘users’
If username exist:
•	response false

deleteUser.js (used for deleting user)
access through http://localhost:3000/api/user/delete
Method: POST
Requested variables:
•	username
If username exist
•	user will be deletedr
If username does not exist:
•	response false

readUsers.js (used for retrieving all user data)
access through http://localhost:3000/api/user/read
Method: GET
Requested variables:
•	none
Response:
•	User Data from collection ‘users’
addUserImage (used for uploading profile image)
access through http://localhost:3000/api/user/addImage
Method: POST
Requested variables:
•	username
•	imagename
Response:
•	image uploaded, user collection updated

# Group (5 routes):
createGroup.js (used for creating a group)
access through http://localhost:3000/api/group/create
Method: POST
Requested variables:
•	groupname
If groupname does not exist:
•	a group with groupname will be added to collection ‘groups’
If groupname exist:
•	response false

deleteGroup.js (used for deleting a group)
access through http://localhost:3000/api/group/delete
Method: POST
Requested variables:
•	groupname
If groupname exist
•	group will be deleted (along with users in group, channels in group and users in channel)
If groupname does not exist:
•	response false

addUserToGroup.js (used for adding user to group)
access through http://localhost:3000/api/group/addUser
Requested variables:
•	groupname
•	username
If groupname exist and if user does not exist in group:
•	user will be added to group
If groupname does not exist or user exist in group:
•	response false

deleteUserFromGroup.js (used for removing user from group)
access through http://localhost:3000/api/group/deleteUser
Method: POST
Requested variables:
•	groupname
•	username
If groupname exist and if user exist in group:
•	user will be deleted from group and channels within group
If groupname does not exist or user does not exist in group:
•	response false

readGroup.js (used for retrieving all group data)
access through http://localhost:3000/api/group/read
Method: GET
Requested variables:
•	none
Response:
•	group data along with channels from collection ‘groups’
 
# Channel (4 routes):
createChannel.js (used for creating a channel)
access through http://localhost:3000/api/channel/create
Method: POST
Requested variables:
•	groupname
•	channelname
If groupname does exist and channel does not exist:
•	a channel with channelname will be added to collection ‘groups' with respect to groupname
If channelname exist within groupname or group name does not exist:
•	response false

deleteChannel.js (used for deleting a channel)
access through http://localhost:3000/api/channel/delete
Method: POST
Requested variables:
•	groupname
•	channelname
If groupname and channelname exist
•	channel will be deleted from group (along with users in channel)
If groupname does not exist or channel does not exist:
•	response false

 
addUserToChannel.js (used for adding user to Channel)
access through http://localhost:3000/api/addusertochannel
Method: POST
Requested variables:
•	groupname
•	username
•	channelname
If groupname exist and channelname exist and if user does not exist in channel:
•	user will be added to channel
If groupname does not exist or channel name does not exist or user exist in channel:
•	response false

deleteUserFromChannel.js (used for removing user from channel)
access through http://localhost:3000/api/channel/deleteUser
Method: POST
Requested variables:
•	groupname
•	username
•	channelname
If groupname exist and channelname exist and if user exist in group:
•	user will be deleted from channel
If groupname does not exist or channel name does not exist or user does not exist in group:
•	response false
 
# Image (1 route):
upload.js (used for uploading image to server)
access through http://localhost:3000/api/image/upload
Method: POST
Requested variables:
•	formdata
Response:
•	Image Uploaded

 

# Angular Architecture

# The client consist of 7 pages (components):
Menu: 
A navigation bar used for navigation which will be displayed across all pages.

Login:
Login page which allows user to input their username and log in
Access the data base and checks if username exist before proceeding
After successful login, stores the username and role to session storage, user will be navigated to the accounts page. (I used session storage as it works better for chat app within the same browser, local storage will affect other tabs in the same browser).

Account:
Displays the username and role

Chat:
Same as workshop 6 activity, chat is implemented.

 
Admin:
Page where most of the functions are built on.
Admin rights where group admin and super admin can access to all routes like create user, create groups etc.
If logged in as group admin, deleting a user will not be displayed.

Database:
Used for admins to view the database information of all users, groups and channels
Image: 
Users can upload/change their profile images here

# Module Used:
{ HttpClientModule } from '@angular/common/http';
•	For requesting a retrieving response from database
{ AppRoutingModule } from './/app-routing.module';
•	Routes to navigate around the client
{ FormsModule } from '@angular/forms';
•	Forms for user log in and admin functions

# Service Used:
{ SocketService } from './services/socket/socket.service';
•	For Chat service (messages and images)


