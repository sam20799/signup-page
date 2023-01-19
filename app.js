const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
const request = require("request");
const https = require("https");

app.use(express.static("public")); 

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    console.log(firstName, lastName, email);

    const data = {
        members: [
            {
              email_address: email,
              status: "subscribed",
              merge_fields: {
                FNAME: firstName,
                LNAME: lastName
              }  
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    
    const url = "https://us21.api.mailchimp.com/3.0/lists/166a34e7c5";
    const options = {
        method: "POST",
        auth: "samOP:79cfdfc70690f59ecc19d54660a0114a-us21"
    };
   
    const request = https.request(url,options,function(response){
        if (response.statusCode === 200 ){          // this is response of api if api response is successful then res.send string to home page here res is for homescreen /
            res.sendFile(__dirname + "/success.html");

        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){   // to check data submitted through url on our server
            console.log(JSON.parse(data));   // to convert recived data on server from hexadecimal code to javascript code.
        })

    })

    request.write(jsonData);
    request.end();

});


app.post("/failure",function(req,res){            // this is for failure page to redirect it to home root. At location /failure perfrome written callback function i.e redirect it to root location.
                                                  
    res.redirect("/")
})





app.listen(3000,function(){
    console.log("server is running on port 3000");

});



// to use css and images we need to put that in a folder and assign that a static folder.
// here we placed css and images inside public folder and make it static.
// in html we don't need locate these files inside ////public/css/filename
// It's will be only css/styles.css
// we only placed it inside public so that we can assign css and favicon folder as static folder and use it.

// data //
// whaterver data we got is in form of javascript we need to turn this in jason
// we converted our data in string in jason format so that we can send it to mail chimp.




                                      // mailchimp.com //

// data is filled a/c to mailchimp.com 
// ther members are stored in array as first element of array that contains multiple properties
// out of which few we used on left side variable is written as per mailchimp server
// so we're basically storing our variables inside mailchimp variable
// merge_fields: will store infor of firstname, lastname ,address,phone no. 
// mailchimp.com
// API key
// 79cfdfc70690f59ecc19d54660a0114a-us21
// Audience Id/ list_id
// 166a34e7c5





// app.js is our server post req from here 