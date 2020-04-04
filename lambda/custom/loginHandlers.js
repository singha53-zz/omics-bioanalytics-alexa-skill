const dbHelper = require('./helpers/dbHelper.js');
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const S3Bucket = "omics-bioanalytics";

// APL
const welcomeTemplate = require('./templates/welcome.js')
const welcomeData = require('./data/welcome.json')
const selectAnalysisTemplate = require('./templates/selectAnalysis.js')
const selectAnalysisData = require('./data/selectAnalysis.json')

module.exports = {
  LaunchRequestHandler: {
    canHandle(handlerInput) {
      return (
        handlerInput.requestEnvelope.request.type === 'LaunchRequest' ||
        (handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
          handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StartOverIntent')
      );
    },
    handle(handlerInput) {
      const speechOutput =  "Welcome to ohmiks bioanalytics, please say the seven digit code to access your analysis."

      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      sessionAttributes.id = ''
      sessionAttributes.chosenValue = ''
      sessionAttributes.selectedAnalysis = 'metadata'
      sessionAttributes.fdr = '0.1'

      const url = s3.getSignedUrl('getObject', {
        Bucket: S3Bucket,
        Key: 'logo.png',
        Expires: 60 * 5
      })

      return handlerInput.responseBuilder
        .speak(speechOutput)
        .reprompt(speechOutput)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.1',
          token: "welcome",
          document: welcomeTemplate(url),
          datasources: welcomeData
        })
        .getResponse();
    },
  },
  PhoneNumberIntentHandler: {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest' && 
      request.intent.name === 'PhoneNumberIntent'
    },
    async handle(handlerInput) {
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

      // extract phone number
      const myPhoneNumber = handlerInput.requestEnvelope.request.intent.slots.mobileNumber.value;


    // save phone number to session attributes 
    sessionAttributes.id = myPhoneNumber

    // check if user is already in the database
    const userData = await dbHelper.getUser(myPhoneNumber)

    if (userData[0] !== undefined && userData[0].id === myPhoneNumber) {
      sessionAttributes.analysis = JSON.parse(userData[0].phoneNumber)
      const speechText = "You are in! Let’s perform some bioinformatics analysis on your data. Which analysis would you like to begin with? You can say, analyze metadata, exploratory data analysis or differential expression analysis."
      return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.1',
        token: "phoneNumberConfirmation",
        document: selectAnalysisTemplate(sessionAttributes.id),
        datasources: selectAnalysisData
      })
      .getResponse();
    } else {
      const speechText = `Hmm. I cannot find this analysis. Please double check the analysis ID or upload your data on the web app again. Sorry for the inconvenience!`
      return handlerInput.responseBuilder
          .speak(speechText)
          .getResponse()
          .catch((err) => {
            console.log("Error occured while saving your phone number", err);
            const speechText = "We cannot retreive your account information right now. Try again!"
            return handlerInput.responseBuilder
              .speak(speechText)
              .getResponse();
          })
    }
    }
  }
}