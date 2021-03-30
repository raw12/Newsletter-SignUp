//jshint esversion: 6

const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended : true}));

app.get("/",function(req , res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req , res){
    const Firstname = req.body.fname;
    const Lastname = req.body.lname;
    const email = req.body.email;

    const data ={
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: Firstname,
                    LNAME: Lastname,
                }
            }
        ]
    };


    const jsondata = JSON.stringify(data);

    // this is a dummy api you can create and use your api

    const url = "https://us1.api.mailchimp.com/example";

    const options = {
        method : "POST",
        auth: "gaurav153: api key ",
    }

    const request = https.request(url , options , function(reponse){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data" ,function(data){
            console.log(JSON.parse(data));
        })
    })
     request.write(jsondata);
     request.end();
});


app.post("/failure" , function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
})

