<p  align="center">

<a  href="http://nestjs.com/"  target="blank"><img  src="https://nestjs.com/img/logo-small.svg"  width="200"  alt="Nest Logo" /></a>

</p>

  

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

  

<p  align="center">A progressive <a  href="http://nodejs.org"  target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

<p  align="center">

<a  href="https://www.npmjs.com/~nestjscore"  target="_blank"><img  src="https://img.shields.io/npm/v/@nestjs/core.svg"  alt="NPM Version" /></a>

<a  href="https://www.npmjs.com/~nestjscore"  target="_blank"><img  src="https://img.shields.io/npm/l/@nestjs/core.svg"  alt="Package License" /></a>

<a  href="https://www.npmjs.com/~nestjscore"  target="_blank"><img  src="https://img.shields.io/npm/dm/@nestjs/common.svg"  alt="NPM Downloads" /></a>

<a  href="https://circleci.com/gh/nestjs/nest"  target="_blank"><img  src="https://img.shields.io/circleci/build/github/nestjs/nest/master"  alt="CircleCI" /></a>

<a  href="https://coveralls.io/github/nestjs/nest?branch=master"  target="_blank"><img  src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9"  alt="Coverage" /></a>

<a  href="https://discord.gg/G7Qnnhy"  target="_blank"><img  src="https://img.shields.io/badge/discord-online-brightgreen.svg"  alt="Discord"/></a>

<a  href="https://opencollective.com/nest#backer"  target="_blank"><img  src="https://opencollective.com/nest/backers/badge.svg"  alt="Backers on Open Collective" /></a>

<a  href="https://opencollective.com/nest#sponsor"  target="_blank"><img  src="https://opencollective.com/nest/sponsors/badge.svg"  alt="Sponsors on Open Collective" /></a>

<a  href="https://paypal.me/kamilmysliwiec"  target="_blank"><img  src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>

<a  href="https://opencollective.com/nest#sponsor"  target="_blank"><img  src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg"  alt="Support us"></a>

<a  href="https://twitter.com/nestframework"  target="_blank"><img  src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>

</p>

<!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)

[![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

  

## Description

This repository has the purpose of obtaining relevant data about LoL players, their games and statistics within the game.
  

## Installation

 -  Download next repository

```bash

$ git clone https://github.com/AdolfoChS97/void-test.git

```

- Enter the repository that we just downloaded

```bash
	
$ cd void-test/

```
 
 -  Copy the content of **.env.example** into a new file called **.env** 

```bash
	
$ cp .env.example .env

```
 
 - If you have not changed the value of the RIOT_API_KEY environment variable in your .env file, the API will not be able to consume the data. I invite you to place the correct API_KEY as follows: 
 
```bash 

RIOT_API_KEY=<Your api_key here>

```

- If you don't how to get this api_key you can follow the next tutorial from second point: 
[https://apipheny.io/riot-games-api/](https://apipheny.io/riot-games-api/)


## Running the app

  Make sure have installed **docker** in your OS and execute: 

```bash
$  docker compose build && docker compose up
```

and enjoy !!! :)

## Testing the API

You can find a collection of Postman requests to test the API in the `docs` folder at the root of the project. Import the collection into Postman and use it to interact with the API endpoints.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create a new issue or submit a pull request.


## Support

  
Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

  

## Stay in touch

  
- Author - [Adolfo Chafardett](mailto:adolfo1997a@gmail.com)


## License

  

Nest is [MIT licensed](LICENSE).