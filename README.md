| Statements | Branches | Functions | Lines |
| --- | --- | --- | --- |
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) |

---

![Marvel](docs/images/marvel.png 'Marvel')

Access here: https://venturalp-marvel.netlify.app/

# 🦸‍♂️ Luizalabs Marvel Challenge

## 🛠 Stack

Main tools used in this project:

| ReactJS | Yarn | Webpack | Jest | Testing Library |
| :-: | :-: | :-: | :-: | :-: |
| [![React](docs/images/react.png 'React')](https://reactjs.org/) | [![Yarn](docs/images/yarn.png 'Yarn')](https://yarnpkg.com/) | [![Webpack](docs/images/webpack.png 'Webpack')](https://webpack.js.org/) | [![Jest](docs/images/jestlogo.png 'Jest')](https://jestjs.io/en/) | [![TestingLibrary](docs/images/testinglibrary.png 'Testing library')](https://testing-library.com/) |
| MSW | Zustand | Styled Components |
| [![MSW](docs/images/msw.png 'MSW')](https://mswjs.io/docs/) | [![Zustand](docs/images/zustand.png 'Zustand')](https://github.com/pmndrs/zustand) | [![StyledComponents](docs/images/styledcomponents.png 'Styled Components')](https://styled-components.com/) |

## ⚠️ Requirements

- Node v12+
- NPM v6.14.8+

## 🗃 Environment variables

| Variable | Description |
| --- | --- |
| `ENVIRONMENT` | As its name says, is the environment of the application. default value: `dev`. values: `dev/prd/hml` |

## 🚀 Installation and Running

This project was developed using `yarn` but one can use `npm` as well.

To run this project one must first install all project dependencies by running:

### npm

```sh
npm install
```

or

### yarn

```sh
yarn
```

Then run the application:

### npm

```sh
npm start
```

or

### yarn

```sh
yarn start
```

After that, the application will open and run at http://localhost:3000

## 💻 Code patterns

This project uses Prettier to auto format code, following Eslint rules (based on [airbnb rules](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)). For those who are using VSCode, this repository already has a vscode config versionated to be easily used.

The project is all set with alias to make things easier when it comes to importing files and modules. One can find this settings inside `package.json`, `jest.config.js`, `jsconfig.json`, `webpack.config.js` and `.esling.js` files. Find more about [here](https://nimblewebdeveloper.com/blog/absolute-alias-imports-in-javascript-vscode)

## 📋 Tests

For tests this application uses [Jest](https://jestjs.io/en/) and [React testing Library](https://testing-library.com/)

Jest setup is located in `jest.config.js` file where one can see that a file `setupTests.js` is being used, this file basically defines a few useful mocks.

One has a few helpers to use on tests located [here](/src/Commons/tests/Tests.Helpers.js): `Commons/tests/Tests.Helpers.js`

Running tests:

```sh
yarn test:all
```

Generate coverage report:

```sh
yarn coverage
```

Then the report can be accessed at `/coverage/lcov-report/index.html`

## 🌐 Mock Server Worker

MSW is used to mock all API requests in our application. Before all tests, the mock server must be started, this happens in `setupTests.js` file, and after each test, the mock is reseted, this is because one can change a few responses to specific tests and still avoid side effects on other tests, and at the end of our tests the server is stopped. All application handlers are located in [Tests.ServerMockHandlers.js](/src/Commons/tests/Tests.ServerMockHandlers.js) file, so every new service must also be included here to be available for tests.

Ok, but if one wants a different return for a specific request, what can one do? This can be easily handled by importing our MSW server and passing the new request specifications, for example:

```js
import { server, rest } from 'Commons/tests/Tests.MockServer'

server.use(
  rest.get(
    `https://developer.marvel.com/v1/public/characters`,
    (req, res, ctx) => res(ctx.status(400)),
  ),
)
```

As it can be seen in the example above, one just needs to import `server` and `rest` from our _MockServer_ and with the server method `use` pass the new request wanted.

## 🌍 Global State Management

This application uses [Zustand](https://github.com/react-spring/zustand) lib to manage global state. When one creates a new store with Zustand, it returns a hook, ready to be used.

## 📡 Axios and Requests

This project uses [Axios](https://github.com/axios/axios) for http requests, and for this, there is a hook (`useRequests`) into the [Requests.defaults.js](/src/Commons/requests/Requests.defaults.js) file, this hook returns an _Axios_ instance with set interceptors. Why is that? Well, the project's interceptors handle global loading feedbacks.

For global loading feedbacks (a loading over all the application), one can pass `showLoading` flag as `true` as an axios request config and the loading will be removed when the request is finished.

## 📝 Commit convention

This project follows [Angular commit convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines) for commit patterns. If one is familiar with it just follow it, otherwise [Commitizen CLI](https://github.com/commitizen/cz-cli) can be used to commit changes, remember, one first needs to stage changes before committing, and in order to commit one can use the script `yarn cz` to run Commitizen CLI and follow the wizard/helper mode. The project also uses [husky](https://github.com/typicode/husky) to handle a _pre-commit_ hook which will run tests before allowing the commit, if one doesn't want to run tests on a commit, use the parameter `--no-verify` on the commit command.
