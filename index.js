require('dotenv').config();
const hellosign = require ('hellosign-sdk')({key: process.env.CC_TEST_API_KEY})

hellosign.account.get().then((res) => {
    //handle response 
    console.log(res)
}).catch((err) => {
    //handle error
    console.log(err);
})