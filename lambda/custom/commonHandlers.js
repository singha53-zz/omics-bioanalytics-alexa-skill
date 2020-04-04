const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const S3Bucket = "omics-bioanalytics";


const welcomeTemplate = require('./templates/welcome.js')
const welcomeData = require('./data/welcome.json')
const selectAnalysisTemplate = require('./templates/selectAnalysis.js')
const selectAnalysisData = require('./data/selectAnalysis.json')

module.exports = {
  FallbackHandler: {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

      if(sessionAttributes.id === ''){
        const url = s3.getSignedUrl('getObject', {
          Bucket: S3Bucket,
          Key: 'logo.png',
          Expires: 60 * 5
          })

        return handlerInput.responseBuilder
        .speak('I\'m sorry ohmiks bioanalytics can\'t help you with that. ' +
          'Please say the seven digit code to access your analysis.')
        .reprompt('Please say the seven digit code to access your analysis.')
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.1',
          token: "welcome",
          document: welcomeTemplate(url),
          datasources: welcomeData
        })
        .getResponse();
      } else {
        return handlerInput.responseBuilder
        .speak('I\'m sorry ohmiks bioanalytics can\'t help you with that. ' +
          'Please say the name of the analysis you would like to perform.')
        .reprompt('Please say the name of the analysis.')
        .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.1',
        token: "phoneNumberConfirmation",
        document: selectAnalysisTemplate(sessionAttributes.id),
        datasources: selectAnalysisData
      })
        .getResponse();
      }


      return handlerInput.responseBuilder
        .speak('I\'m sorry ohmiks bioanalytics can\'t help you with that. ' +
          'Please say the name of the analysis to begin.')
        .reprompt('Please say the name of the analysis to begin.')
        .getResponse();
    },
  },
  HelpHandler: {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;

      return request.type === 'IntentRequest'
        && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      
      if(sessionAttributes.id === ''){
        return handlerInput.responseBuilder
        .speak('This is ohmiks bioanalytics. I can help your perform some bioinformatics analysis on your data. Please say the seven digit code to access your analysis.')
        .reprompt('Please say the seven digit code to access your analysis.')
        .getResponse();
      } else {
        return handlerInput.responseBuilder
        .speak('This is ohmiks bioanalytics. I can help your perform some bioinformatics analysis on your data. Which analysis would you like to begin with? You can say, analyze metadata, exploratory data analysis or differential expression analysis.')
        .reprompt('Please say the name of the analysis you would like to perform.')
        .getResponse();
      }
    },
  },
  ExitHandler: {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;

      return request.type === 'IntentRequest'
        && (request.intent.name === 'AMAZON.CancelIntent'
          || request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak('See you soon!')
        .getResponse();
    },
  },
  SessionEndedRequestHandler: {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
      console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

      return handlerInput.responseBuilder.getResponse();
    },
  },
  ErrorHandler: {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${handlerInput.requestEnvelope.request.type} ${handlerInput.requestEnvelope.request.type === 'IntentRequest' ? `intent: ${handlerInput.requestEnvelope.request.intent.name} ` : ''}${error.message}.`);

      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      const url = s3.getSignedUrl('getObject', {
          Bucket: S3Bucket,
          Key: 'logo.png',
          Expires: 60 * 5
          })

      return handlerInput.responseBuilder
        .speak('This is ohmiks bioanalytics. I can help your perform some bioinformatics analysis on your data. Please say the seven digit code to access your analysis.')
        .reprompt('Please say the seven digit code to access your analysis.')
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.1',
          token: "welcome",
          document: welcomeTemplate(url),
          datasources: welcomeData
        })
        .getResponse();
    },
  }
}