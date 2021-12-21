
# Social Network App

Its a social network platform where You can connect with other people ,you can check their profile,
you can create your own profile and you can share your thoughts,images and videos in this network with others user



## Dependencies used

1. node v14.17.3
2. npm@6.14.13
3. Angular CLI: 12.1.3 




### Environment Variables

To run this project, you will need to add the following environment variables to your .env file (/backend/.env)
in the backend directory

`DATABASE`=mongodb+srv://rohit:mydb@cluster0.yeqxw.mongodb.net/dreamApp?retryWrites=true&w=majority
`SECRET_KEY`=mernproject
`USERPOST_FILE_LOCATION`=public/uploadfile/userspost
`USERPOST_PROFILE_PIC_LOCATION`=public/uploadfile/userpic
`BASE_FILE_URL`=http://localhost:5000/



#### Database Configuration
database name - dreamapp
Hostname - localhost
Username - root
password - 

*note-> you can use mongo atlas.I already provided my mongodb cluster link in .env file in backend directory.
In file system You have to go /backend/db/db.js
and uncomment the line number 3 and comment out line number 2 



##### Run on local machine

1. install all dependencies in your local machine
2. in root directory open cmd and run 'ng serve'
3. go to /backend directory and open cmd and run 'npm run start'



###### Deployment

1. go /build/social-network and upload all files and folder into your serve root directory.

2. upload backend folder into your server root directory

3. go to  /backend/db/db.js and uncomment the line number 3 and comment out line number 2 


###### Existing user
1. email-rohit@gmail.com
   password-1234

2. email- ald@gmail.com
   password - abcd

3. email - john@gmail.com
   password - 1234
  






