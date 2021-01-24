# BetworksMsgAppClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5. The project is used to demonstrate some core competencies in front end web develpoment.

## Installing Docker
Follow the following [link](https://www.docker.com/get-started) to install docker

## Building the Application
Run `docker build -t msgclient .` to build the project.

## Run the application
Run `docker run -it -p 80:80 --rm msgclient` to run the project on port 80.
navigate to `[machine_ip]:80` or `[machine_ip]` ex. http://localhost to access the web application
<br>
Some valid test users are: <br> 
`user:test password:test` <br>
`user:test2 password:test`

## Running unit tests
Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
