# covid19-updates (India)

Simple web app to send daily covid-19 cases updates to users using Node, Express.js, Twilio Api and some other packages.

[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

## About

This application uses Twilio API to send daily covid-19 cases updates to the registered users.<br>
Data Source - [Covid 19 India API (Unofficial)](https://api.covid19india.org)
<br>
This web app is a part of Dev-Twilio Hackathon on dev.to

### How it works

Users register with their Name, Phone Number and State (currently only Gujarat and Maharashtra is available) and they will get daily updates of cases in their state and in India, twice a day(9 am & 8 pm) via SMS (Twilio SMS Api) <br> User can choose to stop the service by sending "STOP" to the number(Twilio Number).

## Features

- Node.js web server using Express.js
- Basic web user interface using EJS for templating and Bootstrap for UI
- User interface to register
- Project Specific environment variables using `.env` files.

## Usage

### Requirements

- [Node.js](https://nodejs.org/)
- A Twilio account - [sign up](https://www.twilio.com/try-twilio)

### Twilio Account Settings

| Config&nbsp;Value | Description                                                                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account&nbsp;Sid  | Your primary Twilio account identifier - find this [in the Console](https://www.twilio.com/console).                                                         |
| Auth&nbsp;Token   | Used to authenticate - [just like the above, you'll find this here](https://www.twilio.com/console).                                                         |
| Phone&nbsp;number | A Twilio phone number in [E.164 format](https://en.wikipedia.org/wiki/E.164) - you can [get one here](https://www.twilio.com/console/phone-numbers/incoming) |

### Local development

After the above requirements have been met:

1. Clone this repository and `cd` into it

```bash
git clone https://github.com/jamesshah/covid19-updates.git
cd covid19-updates
```

2. Install dependencies

```bash
npm install
```

3. Set your environment variables in .enc

```bash
create .env file in /covid19-updates directory
```

See [Twilio Account Settings](#twilio-account-settings) to locate the necessary environment variables.

4. Run the application

```bash
npm start
```

This will run the server using nodemon package. It will reload whenever you change any files.

5. Navigate to [http://localhost:3000](http://localhost:3000)

That's it!

## Contributing

### ToDo

- [x] Build a basic working app
- [x] Update Readme File
- [ ] Add more states and regions

This template is open source and welcomes contributions. All contributions are subject to our [Code of Conduct](https://github.com/twilio-labs/.github/blob/master/CODE_OF_CONDUCT.md).

[Visit the project on GitHub](https://github.com/twilio-labs/sample-template-nodejs)

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

No warranty expressed or implied. Software is as is.
