# Build the Omics BioAnalytics Alexa Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

## Setup w/ ASK CLI

### About
This readme assumes you have your developer environment ready to go and that you have some familiarity with CLI (Command Line Interface) Tools, [AWS](https://aws.amazon.com/), and the [ASK Developer Portal](https://developer.amazon.com/alexa-skills-kit?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=petmatch-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_petmatch-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs).

### Pre-requisites

* Node.js (> v12)
* Register for an [AWS Account](https://aws.amazon.com/)
* Register for an [Amazon Developer Account](https://developer.amazon.com?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=petmatch-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_petmatch-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs)
* Install and Setup [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=petmatch-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_petmatch-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs)
* Make and S3 bucket. Set the S3Bucket env variable. Add the following [files](./S3files/S3files.md) to your bucket.
* Make a DynamoDB table with the primary key as "id". Set the table name as an env variable.

### Installation
1. **Make sure** you are running the latest version of the CLI

	```bash
	$ npm update -g ask-cli
	```

2. **Clone** the repository.

	```bash
	$ git clone https://github.com/singha53/omics-bioanalytics-alexa-skill.git
	```

3. If it's your first time using it, **initiatialize** the [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=petmatch-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_petmatch-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs) by navigating into the repository and running npm command: `ask init`. Follow the prompts.

	```bash
	$ cd omics-bioanalytics-alexa-skill
	$ ask init
	```

4. Install npm dependencies by navigating into the `/lambda/custom` directory and running the npm command: `npm install --save`

	```bash
	$ cd lambda/custom
	$ npm install
	```

### Deployment

ASK CLI **will create the skill and the lambda function for you**.

1. Navigate to the project's root directory. you should see a file named 'skill.json' there.
2. Deploy the skill and the lambda function in one step by running the following command:

	```bash
	$ ask deploy
	```

### Testing

1. To test, you need to login to Alexa Developer Console, and **enable the "Test" switch on your skill from the "Test" Tab**.

2. Simulate verbal interaction with your skill through the command line (this might take a few moments) using the following example:

	```bash
	 $ ask simulate -l en-GB -t "start omics bioanalytics"

	 ✓ Simulation created for simulation id: 4a7a9ed8-94b2-40c0-b3bd-fb63d9887fa7
	◡ Waiting for simulation response{
	  "status": "SUCCESSFUL",
	  ...
	 ```

3. Once the "Test" switch is enabled, your skill can be tested on devices associated with the developer account as well. Speak to Alexa from any enabled device, from your browser at [echosim.io](https://echosim.io/welcome), or through your Amazon Mobile App and say :

	```text
	Alexa, start omics bioanalytics
	```

# References
- I used the [Pet Match Alexa Skill](https://github.com/alexa/skill-sample-nodejs-petmatch/blob/master/instructions/7-cli.md) as a template.