![AWS Bill Renamer](logo.png "AWS Lambda Bill Renamer")
# AWS Bill Renamer
A web service that can detect the name a bill should have, based off the text
it contains.

## How to
1. Clone this repository
2. Get the [aws cli][] and login
3. Create a Lambda function (call it `bills`)
4. Copy [conf/sample-config.json](conf/sample-config.json) to `conf/config.json`
   and add details of your bills
4. Run `npm run deploy` - Thats it! Your code is now on AWS Lambda.
5. Submit the text of a bill to the web service, and it will return the file
   name it should be renamed to.

[aws cli]: http://docs.aws.amazon.com/cli/latest/userguide/installing.html
