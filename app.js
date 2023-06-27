const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extedede : true}));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html")
});


app.post("/",function(req,res){
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.Email;
  
  const data = {
    members: [
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME : firstname,
          LNAME : lastname
        }
      }
    ]
  };
  
  const jsondata = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/f04cc10fcc"

  const Option ={
    method: "POST",
    auth : "shruti:c5033ac3b1bfa0db63fe6273a5ace481-us21"
  }

  

  const request = https.request(url,Option,function(response){

     if(response.statusCode === 200){
     res.sendFile(__dirname + "/success.html");
     }else{
      res.sendFile(__dirname + "/failure.html");
     }

     response.on("data", function(data){
      console.log(JSON.parse(data));
     })
  })

  request.write(jsondata);
  request.end();


});

app.post("/failure",function(req,res){
  res.redirect("/");
}),


app.listen(process.env.PORT || 3000,function(){
    console.log("server is listening at port 3000");
  });



  // API KEY
  // c5033ac3b1bfa0db63fe6273a5ace481-us21


  // List ID
  // f04cc10fcc