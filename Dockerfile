FROM node

WORKDIR /aap

RUN curl https://install.meteor.com/ | sh

ADD . .

EXPOSE 3000
RUN meteor npm install
