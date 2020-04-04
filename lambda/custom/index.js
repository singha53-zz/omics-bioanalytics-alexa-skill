/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
const login = require('./loginHandlers');
const analysis = require('./analysisHandlers');
const common = require('./commonHandlers');
const dbHelper = require('./helpers/dbHelper.js');
const tableName = "omics-bioanalytics-table"; // remember to attach the AmazonDynamoDBFullAccess policy to ask-lambda-table-turn-anil role

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    login.LaunchRequestHandler,
    login.PhoneNumberIntentHandler,
    analysis.AnalysisIntentHandler,
    analysis.SpecificAnalysisIntentHandler,
    analysis.FDRIntentHandler,
    analysis.MainMenuIntentHandler,
    common.HelpHandler,
    common.FallbackHandler,
    common.ExitHandler,
    common.SessionEndedRequestHandler,
  )
  .addErrorHandlers(common.ErrorHandler)
  .withTableName(tableName)
  .withAutoCreateTable(true)
  .lambda();
