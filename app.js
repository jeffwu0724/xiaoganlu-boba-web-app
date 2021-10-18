const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.static("html"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/signup", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  console.log(firstName, lastName, email);
  var data = {
    members:[
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
  // const jonData = JSON.stringify(data);
  // const url = "https://$API_SERVER.api.mailchimp.com/3.0/lists/********";
  // const options {
  //   method: "POST",
  // }
  // https.request(url, options, function(response))

  mailchimp.setConfig({
   apiKey: "****************",
   server: "***",
 });
 async function run() {

      const response = await mailchimp.lists.batchListMembers("***********", data);
      console.log(response);
      console.log(response.error_count);
      if(response.error_count != 0){
        res.sendFile(__dirname + "/html/failure.html");
      }else{
        res.sendFile(__dirname + "/html/success.html");
      }

  };
  run();


});

app.post("/failure", function(req, res) {
  res.sendFile(__dirname + "/html/signup.html");
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on Port 3000");
});
