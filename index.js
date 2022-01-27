require('dotenv').config();
const inquirer = require('inquirer');
const hellosign = require ('hellosign-sdk')({key: process.env.CC_TEST_API_KEY})

inquirer.prompt([
    {
        type:'list',
        name:'input',
        message:'HS Console Menu',
        choices:['Account','Other GET Requests']
    }
]).then(function(res){

    switch ( res.input ){
        case 'Account':
            hellosign.account.get().then((res) => {
                    console.log(res);
                }).catch((err) => {
                console.log(err);
                })
            break;

        case 'Other GET Requests':
            otherGET();
            break;

        default:
            break;
    }
   
});

function otherGET() {

    const opts = {
      test_mode: 1,
    };

    inquirer
      .prompt([
        {
          type: "list",
          name: "otherGET",
          message: "Other Get Requests",
          choices: ["Sign  URL", "Signature Request", "Template", "API App"],
        },
      ])
      .then(function (res) {
        switch (res.otherGET) {
          case "Sign  URL":
            hellosign.signatureRequest
              .createEmbedded(opts)
              .then((res) => {
                const signature = res.signature_request.signatures[0];
                const signatureId = signature.signature_id;

                return hellosign.embedded.getSignUrl(signatureId);
              })
              .then((res) => {
                console.log("The Sign URL: " + res.embedded.sign_url);
              })
              .catch((err) => {
                console.log(err);
              });
            break;
          case "Signature Request":
            console.log("Signature Request");

            inquirer
              .prompt([
                {
                  type: "input",
                  name: "signatureRequest",
                  message: "Enter Signature Request ID: ",
                },
              ])
              .then(function (res) {
                let signatureRequestId = res.signatureRequest;
                hellosign.signatureRequest
                  .get(signatureRequestId)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });

            break;
          case "Template":
            console.log("Template");
            break;
          case "API App":
            console.log("API App");
            break;
          default:
            break;
        }
      });
}