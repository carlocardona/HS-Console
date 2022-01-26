require('dotenv').config();
const inquirer = require('inquirer');
const hellosign = require ('hellosign-sdk')({key: process.env.CC_TEST_API_KEY})

inquirer.prompt([
    {
        type:"input",
        message:"Choose 1",
        name:"choice"
    }
]).then(function(res){

    if (res.choice === '1'){

        console.log("Response 1 Hit");
        hellosign.account.get().then((res) => {
            console.log(res);

        }).catch((err) => {
            console.log(err);
        })
    }
})