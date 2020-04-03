const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const S3Bucket = "omics-bioanalytics";

// APL templates
const metadataListTemplate = require('./templates/metadata_list.json')
const metadataItemTemplate = require('./templates/metadata_item.js')

// APL data
const metadataListData = require('./data/metadata_list.js')
const metadataItemData = require('./data/metadata_item.json')

const helperFuncs = require('./helpers/funcs.js');

module.exports = {
  AnalysisIntentHandler: {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest' && request.intent.name === 'AnalysisIntent'
    },
    handle(handlerInput) {
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

      const analysisType = handlerInput.requestEnvelope.request.intent.slots.analysis.resolutions.resolutionsPerAuthority[0].values[0].value.name;
      
      let speechText = 'Please repeat your request.';
      if(analysisType === "metadata"){
        speechText = `Say the number of the variable you would like me to analyze. ${sessionAttributes.selectedAnalysis === ""? "You can scroll down with your finger if the list is too long" : ""}`
        sessionAttributes.selectedAnalysis = 'ds'
        const ds_variables = Object.keys(sessionAttributes.analysis.ds);

        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.1',
          token: "ds_metadata_list",
          document: metadataListTemplate,
          datasources: metadataListData(ds_variables, "Metadata")
        })
        .getResponse();

      } else if(analysisType === "eda"){
        speechText = "Say the number of the dataset you would like me to perform Principal Component Analysis on."
        sessionAttributes.selectedAnalysis = 'eda'
        const eda_datasets = Object.keys(sessionAttributes.analysis.eda);

        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.1',
          token: "eda_metadata_list",
          document: metadataListTemplate,
          datasources: metadataListData(eda_datasets, "E. D. A.")
        })
        .getResponse();

      } else if(analysisType === "dexp"){
        speechText = "Say the number of the dataset you would like me to perform Differential Expression Analysis on."
        sessionAttributes.selectedAnalysis = 'dexp'
        const dexp_datasets = Object.keys(sessionAttributes.analysis.dexp);
        
        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          version: '1.1',
          token: "eda_metadata_list",
          document: metadataListTemplate,
          datasources: metadataListData(dexp_datasets, "Differential Expression")
        })
        .getResponse();

      } else {
        speechText = "Sorry, I didn't get that. Can you please repeat your request."
        sessionAttributes.selectedAnalysis = ''

        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
      }

      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();

    }
  },
  SpecificAnalysisIntentHandler: {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest' && request.intent.name === 'SpecificAnalysisIntent'
    },
    handle(handlerInput) {
      const { requestEnvelope, attributesManager, responseBuilder } = handlerInput;
      const { intent } = requestEnvelope.request;     
      const sessionAttributes = attributesManager.getSessionAttributes();
      const analysisType = sessionAttributes.selectedAnalysis;
      const upperLimit = Object.keys(sessionAttributes.analysis[analysisType]).length;
      const slotValid = isSlotValid(intent, upperLimit);

      const analysisTypeSpeak = {
        "ds": "metadata",
        "eda": "exploratory data analysis",
        "dexp": "differential expression analysis"
      }

      if (slotValid){
        const chosenValue = parseInt(intent.slots.specificAnalysis.value, 10)-1;
        const item = Object.keys(sessionAttributes.analysis[analysisType])[chosenValue];
        const itemContents = sessionAttributes.analysis[analysisType][item];
        const speechText = `I analyzed the data for ${item}. Please say ${analysisTypeSpeak[analysisType]} to return to the previous menu.`
        
        console.log("itemContents")
        console.log(itemContents)
        let plotUrl = '';
        if(analysisType === "dexp"){
          sessionAttributes.chosenValue = chosenValue
          plotUrl = s3.getSignedUrl('getObject', {
          Bucket: S3Bucket,
          Key: `${sessionAttributes.id}-${analysisType}-${item}-${sessionAttributes.fdr}.png`,
          Expires: 60 * 5
          })

          return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(speechText)
          .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.1',
            token: "metadata_item",
            document: metadataItemTemplate(itemContents[sessionAttributes.fdr].primary[0], itemContents[sessionAttributes.fdr].secondary[0], itemContents[sessionAttributes.fdr].tertiary[0], itemContents[sessionAttributes.fdr].quaternary[0], plotUrl, sessionAttributes.id),
            datasources: metadataItemData
          })
          .getResponse();
        } else {
          plotUrl = s3.getSignedUrl('getObject', {
          Bucket: S3Bucket,
          Key: `${sessionAttributes.id}-${analysisType}-${item}.png`,
          Expires: 60 * 5
          })

          return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(speechText)
          .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.1',
            token: "metadata_item",
            document: metadataItemTemplate(itemContents.primary[0], itemContents.secondary[0], itemContents.tertiary[0], itemContents.quaternary[0], plotUrl, sessionAttributes.id),
            datasources: metadataItemData
          })
          .getResponse();
        }
      } else {
        speechText = `Sorry, I cannot find that ${analysisType === "ds" ? 'variable' : 'dataset'}. Please say a number between 1 and ${upperLimit}. Or say ${analysisTypeSpeak[analysisType]} to return to the previous menu.`

        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
      }

    }
  },
  FDRIntentHandler: {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest' && request.intent.name === 'FDRIntent'
    },
    handle(handlerInput) {
      const { requestEnvelope, attributesManager, responseBuilder } = handlerInput;
      const { intent } = requestEnvelope.request; 
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      const analysisType = sessionAttributes.selectedAnalysis;
      const chosenValue = sessionAttributes.chosenValue;
      console.log(`FDR value: ${intent.slots.falsediscovery.value}`)

      const fdr = parseInt(intent.slots.falsediscovery.value, 10)/100;

      console.log(typeof(fdr))
      console.log([0.01, 0.05, 0.1, 0.2].indexOf(fdr))
      let speechText = "Please try another false discovery rate."
      if(analysisType === "dexp" && [0.01, 0.05, 0.1, 0.2].indexOf(fdr) === -1){
      speechText = "Please choose from one, five, ten or twenty percent for possible F D R values."
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
      } else if(analysisType === "dexp" && [0.01, 0.05, 0.1, 0.2].indexOf(fdr) != -1) {
      const item = Object.keys(sessionAttributes.analysis[analysisType])[chosenValue];
      const itemContents = sessionAttributes.analysis[analysisType][item];
      speechText = `Please see the updated analysis based on an F D R of ${100*fdr} percent. You can say another false discovery rate or say main menu to return to see all analysis options.`
      sessionAttributes.fdr = fdr.toString()
      const plotUrl = s3.getSignedUrl('getObject', {
        Bucket: S3Bucket,
        Key: `${sessionAttributes.id}-${analysisType}-${item}-${sessionAttributes.fdr}.png`,
        Expires: 60 * 5
        })


      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.1',
            token: "metadata_item_fdr",
            document: metadataItemTemplate(itemContents[sessionAttributes.fdr].primary[0], itemContents[sessionAttributes.fdr].secondary[0], itemContents[sessionAttributes.fdr].tertiary[0], itemContents[sessionAttributes.fdr].quaternary[0], plotUrl, sessionAttributes.id),
            datasources: metadataItemData
          })
        .getResponse();
      } else {
      speechText = "This feature in only availabe for differential expression analysis. Please say, differential expression analysis to analyse your ohmiks data."
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
      }


      speechText = "Please say, 'main menu' to return to the main menu."
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
  }
}