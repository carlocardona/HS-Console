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

  function signatureRequest() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "input",
          message: "--- Signature Request ---",
          choices: [
            "Send Signature Request with File",
            "Send Signature Request with Signer Fields",
            "Send Signature Request with Template",
            "Send Signature Request with Ordered Signers",
            "Cancel Incomplete Signature Request",
          ],
        },
      ])
      .then(function (res) {
        switch (res.input) {
          case "Send Signature Request with File":
            let optionsSigReqFile = {
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

            hellosign.signatureRequest
              .createEmbedded(optionsSigReqFile)
              .then(function (res) {
                console.log(res.signature_request);
              });
            break;

          case "Send Signature Request with Signer Fields":
            let signersSigReqTemp = [
              {
                email_address: "carlocardona@dropbox.com",
                name: "George",
                role: "Student",
              },
            ];

            let optionsSigReqTemp = {
              test_mode: 1,
              template_id: "d6ec4e2fefb73f556f7176c82a5d3299cfc214eb",
              subject: "Student Agreement Form",
              message: "Welcome, and congratulations!",
              signers: signersSigReqTemp,
              custom_fields: [
                {
                  name: "start_date",
                  value: "01/10/2016",
                  editor: "Student",
                  required: true,
                },
              ],
            };

            hellosign.signatureRequest
              .sendWithTemplate(optionsSigReqTemp)
              .then(function (res) {
                console.log(res.signature_request);
              });
            break;

          case "Send Signature Request with Template":
            var signersRequestWTemplate = [
              {
                email_address: "george@example.com",
                name: "George",
                role: "Student",
              },
            ];

            var optionsRequestWTemplate = {
              test_mode: 1,
              template_id: "d6ec4e2fefb73f556f7176c82a5d3299cfc214eb",
              subject: "Student Agreement Form",
              message: "Glad we could come to an agreement.",
              signers: signersRequestWTemplate,
              custom_fields: [
                {
                  name: "start_date",
                  value: "01/10/2016",
                  editor: "Student",
                  required: true,
                },
              ],
            };

            hellosign.signatureRequest
              .sendWithTemplate(optionsRequestWTemplate)
              .then(function (res) {
                console.log(res.signature_request);
              });
            break;

          case "Send Signature Request with Ordered Signers":
            console.log("Test");
            break;

          case "Cancel Incomplete Signature Request":
            let request_id = "fa5c8a0b0f492d768749333ad6fcc214c111e967";
            hellosign.signatureRequest
              .cancel(request_id)
              .then(function (response) {
                console.log(response.statusCode);
                console.log(response.statusMessage);
              })
              .catch(function (err) {
                console.log(err);
              });

          default:
            break;
        }
      });
  }