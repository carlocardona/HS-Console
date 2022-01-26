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
    console.log("Other Get Called")
}