require('dotenv').config();
const inquirer = require('inquirer');
const hellosign = require ('hellosign-sdk')({key: process.env.CC_TEST_API_KEY})

inquirer
  .prompt([
    {
      type: 'list',
      name: 'input',
      message: '--- HS Console Menu ---',
      choices: ['Account', 'Signature Request'],
    },
  ])
  .then(function (res) {
    switch (res.input) {
      case 'Account':
        hellosign.account
          .get()
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case 'Signature Request':
        signatureRequest();
        break;
      
      default:
        break;
    }
  });

  function signatureRequest () {

    inquirer.prompt([
      {
        type:'list',
        name: 'input',
        message: '--- Signature Request ---',
        choices: ['Send Signature Request']
      }
    ]).then(function (res) {

      switch (res.input){

        case 'Send Signature Request':
          var options = {
            test_mode: 1,
            clientId: "3b358187f617211a875a1e410117371c",
            title: "NDA with Acme Co.",
            subject: "The NDA we talked about",
            message:
              "Please sign this NDA and then we can discuss more. Let me know if you have any questions.",
            signers: [
              {
                email_address: "carlocardona@dropbox.com",
                name: "Jack",
              },
            ],
            files: ["Demo-TwoSign-NDA.pdf"],
          };
  
          hellosign.signatureRequest.createEmbedded(options).then(function (res) {
            console.log(res.signature_request);
          });
          break;

        default:
          break;

      }

    })
  }

// function otherGET() {
//   const opts = {
//     test_mode: 1,
//   };

//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "otherGET",
//         message: "Other Get Requests",
//         choices: ["Sign  URL", "Signature Request", "Template", "API App"],
//       },
//     ])
//     .then(function (res) {
//       switch (res.otherGET) {
//         case "Sign  URL":
//           hellosign.signatureRequest
//             .createEmbedded(opts)
//             .then((res) => {
//               const signature = res.signature_request.signatures[0];
//               const signatureId = signature.signature_id;

//               return hellosign.embedded.getSignUrl(signatureId);
//             })
//             .then((res) => {
//               console.log("The Sign URL: " + res.embedded.sign_url);
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//           break;
//         case "Signature Request":
//           console.log("Signature Request");

//           inquirer
//             .prompt([
//               {
//                 type: "input",
//                 name: "signatureRequest",
//                 message: "Enter Signature Request ID: ",
//               },
//             ])
//             .then(function (res) {
//               let signatureRequestId = res.signatureRequest;
//               hellosign.signatureRequest
//                 .get(signatureRequestId)
//                 .then((res) => {
//                   console.log(res);
//                 })
//                 .catch((err) => {
//                   console.log(err);
//                 });
//             });

//           break;
//         case "Template":
//           console.log("Template");
//           break;
//         case "API App":
//           console.log("API App");
//           break;
//         default:
//           break;
//       }
//     });
// }