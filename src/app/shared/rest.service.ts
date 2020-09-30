import { Injectable } from '@angular/core';

import { AppProject } from '../shared/data.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor() { }


  // function for loading projects from database
  loadProjects(): Promise<AppProject[]> {
    return new Promise(resolve => {
      setTimeout(() => {
         const appProjects: AppProject[] = [
          {
            id: '0',
            title: 'choose my meal',
            status: {progress: 'finished', language: 'html/js', classification: 'private', hostType: 'web'},
            desc: 'solution if your partner and you once again can not decide on where and what to eat',
            gitLink: 'https://github.com/paul-costa/choosemymeal',
            directLink: 'https://projects.paulcosta.at/choose-my-meal',
            additionInfo: null,
          },
          {
            id: '1',
            title: 'weather.design-v1',
            status: {progress: 'finished', language: 'html/js', classification: 'private', hostType: 'web'},
            desc: 'the lovechild of an animated wallpaper and the weather widget on your phone. darksky weather and google geocoding api & firebase backend',
            gitLink: 'https://github.com/paul-costa/weather.design-v1',
            directLink: 'https://projects.paulcosta.at/weather-design-v1',
            additionInfo: null,
          },
          {
            id: '2',
            title: 'weather.design-v2',
            status: {progress: 'finished', language: 'angular', classification: 'private', hostType: 'firebase'},
            desc: 'angular derivate of weather.design-v1 web application. darksky weather and google geocoding api & firebase backend',
            gitLink: 'https://github.com/paul-costa/weather.design-v2',
            directLink: 'https://projects.paulcosta.at/weather-design-v2',
            additionInfo: null,
          },
          {
            id: '3',
            title: 'weather.design-v3',
            status: {progress: 'finished', language: 'angular/ionic', classification: 'private', hostType: 'not-hosted'},
            desc: 'derivate of weather.design-v2 web application with mobile first approach (incl. capacitor support). darksky weather and google geocoding api & firebase backend',
            gitLink: 'https://github.com/paul-costa/weather.design-v3',
            directLink: 'https://projects.paulcosta.at/weather-design-v3',
            additionInfo: null,
          },
          {
            id: '4',
            title: 'test simulator',
            status: {progress: 'finished', language: 'html/js', classification: 'private', hostType: 'web'},
            desc: 'simulating tests with randomized order of questions and answer check',
            gitLink: 'https://github.com/paul-costa/testSimulator',
            directLink: 'https://projects.paulcosta.at/test-simulator',
            additionInfo: null,
          },
          {
            id: '5',
            title: 'prime number calculator',
            status: {progress: 'finished', language: 'html/js', classification: 'private', hostType: 'web'},
            desc: 'calculates prime numbers on client side through various techniques and algorithms',
            gitLink: 'https://github.com/paul-costa/PrimeNumberCalculator',
            directLink: 'https://projects.paulcosta.at/prime-number-calculator',
            additionInfo: null,
          },
          {
            id: '6',
            title: 'vue floating orbs',
            status: {progress: 'finished', language: 'vue/js', classification: 'private', hostType: 'web'},
            desc: 'this small application was a little sidestep by myself into vue-js. this application is a component of a larger application and was an exercise in some vue animation, svg path animation, etc.',
            gitLink: 'https://github.com/paul-costa/vue-floating-orbs',
            directLink: 'https://projects.paulcosta.at/vue-floating-orb',
            additionInfo: null,
          },
          {
            id: '7',
            title: 'paul costa home',
            status: {progress: 'construction', language: 'angular', classification: 'private', hostType: 'firebase'},
            desc: 'repo for the homepage of Paul Costa. only partly hosted. main attraction: portfolio carousel',
            gitLink: 'https://github.com/paul-costa/homepage',
            directLink: 'https://paulcosta.at',
            additionInfo: null,
          },
          {
            id: '8',
            title: 'pgp public key',
            status: {progress: 'finished', language: 'html/js', classification: 'private', hostType: 'web'},
            desc: 'access to the pgp public key for Paul Costa to send asymmetric encrypted messages and files',
            gitLink: 'https://github.com/paul-costa/pgpKey',
            directLink: 'https://projects.paulcosta.at/pgp',
            additionInfo: null,
          },
          {
            id: '9',
            title: 'viktoria wehner home (external proj)',
            status: {progress: 'finished', language: 'angular', classification: 'external/order', hostType: 'firebase'},
            desc: 'repo contains the homepage of viktoria wehner (viktoria@viktoriawehner.com)',
            gitLink: 'https://github.com/paul-costa/viktoria-wehner-homepage',
            directLink: 'https://viktoriawehner.com',
            additionInfo: null,
          },
          {
            id: '10',
            title: 'vcw blog (external proj)',
            status: {progress: 'construction', language: 'angular', classification: 'external/order', hostType: 'firebase'},
            desc: 'blog application for third party with entry and view components.',
            gitLink: 'https://github.com/paul-costa/vcw-blog',
            directLink: 'https://viktoriawehner.com/vcw-blog',
            additionInfo: null,
          },
          {
            id: '11',
            title: 'bookish thoughts',
            status: {progress: 'deprecated', language: 'angular', classification: 'private', hostType: null},
            desc: 'project loosely based on the concept of a online library website (eg. goodreads.com) with some personal blog elements',
            gitLink: 'https://github.com/paul-costa/bookishThoughts',
            directLink: null,
            additionInfo: null,
          },
          {
            id: '12',
            title: 'pi estimator',
            status: {progress: 'finished', language: 'js', classification: 'private', hostType: null},
            desc: 'simple js application, which show how pi can be (theoretically perfect) calculated by just using one method returning two random numbers between zero and one',
            gitLink: 'https://github.com/paul-costa/pi-estimator',
            directLink: null,
            additionInfo: null,
          },
          {
            id: '13',
            title: 'kantine 4.0',
            status: {progress: 'construction', language: 'angular/ionic', classification: 'private', hostType: null},
            desc: 'hybrid web/mobile frontend (incl. capacitor support) of "kantine 4.0". communication with backend over rest interface. displays varying lunch options, which are available at the "kantine 4.0" restaurant in the icon tower in vienna (https://www.m-eventcatering.at/m-lunchsolutions/)',
            gitLink: 'https://github.com/paul-costa/kantine-4.0',
            directLink: null,
            additionInfo: null,
          },
          {
            id: '14',
            title: 'kantine 4.0 backend',
            status: {progress: 'construction', language: 'node', classification: 'private', hostType: null},
            desc: 'backend of "kantine 4.0". analysis and processing of un-cleansed data, discerned from a provided pdf. provision of rest interface for frontend application. process menu by "kantine 4.0" restaurant in the icon tower in vienna (https://www.m-eventcatering.at/m-lunchsolutions/wochenplan/wochenplan.pdf)',
            gitLink: 'https://github.com/paul-costa/kantine-4.0-backend',
            directLink: null,
            additionInfo: null,
          },
          {
            id: '15',
            title: 'simple ocr',
            status: {progress: 'finished', language: 'ejs/node', classification: 'private', hostType: null},
            desc: 'ocr (optical character recognition) application with mobile first approach',
            gitLink: 'https://github.com/paul-costa/simpleOCR',
            directLink: null,
            additionInfo: null,
          },
          {
            id: '16',
            title: 'suggest a book',
            status: {progress: 'construction', language: 'angular/ionic', classification: 'private', hostType: null},
            desc: 'hybrid web/mobile (incl. capacitor support) mobile first application. communication over rest with the goodreads.com api. lists suggestions, descriptions, etc. based on selected books. some sorting, some filtering, some logic for the of so perfect goodreads api',
            gitLink: 'https://github.com/paul-costa/book-suggestions',
            directLink: null,
            additionInfo: null,
          },
          {
            id: '17',
            title: 'logo quiz',
            status: {progress: 'construction', language: 'angular/ionic', classification: 'private', hostType: null},
            desc: 'simple logo quiz mobile first (incl. capacitor support) application, which prompts users with logos and suggestions, a little fun game to snack on',
            gitLink: 'https://github.com/paul-costa/logo-quiz',
            directLink: null,
            additionInfo: null,
          },
        ];

        resolve(appProjects);
      }, 1000);
    });
  }
}
