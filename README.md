
## Format for Maze Input
I changed the format of the input file for the maze to be a JSON file with the following schema:

{
	rows:{
        "row1": [1,0,1,1],
        "row2": [1,0,1,0],
        "row3": [1,0,2,0],
        "row4": [1,0,1,0],
        "row5": [1,1,1,3],
	}
}

## TODOs - Pending that I'd like to have implemented:
1. Put some more unit testing and use something like Moq to generate responses.
2. Review more the rendering process of components to avoid too many re-renders in the rendering tree.


# Valant

This project was generated using [Nx](https://nx.dev).

[Nx Documentation](https://nx.dev/getting-started/nx-and-angular)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application](https://nx.dev/angular-tutorial/01-create-application)

## Get started

Run `npm install` to install the UI project dependencies. Grab a cup of coffee or your beverage of choice.
You may also need to run `npm install start-server-and-test` and `npm install cross-env`

As you build new controller endpoints you can auto generate the api http client code for angular using `npm run generate-client:server-app`

## Development server

Run `npm run start` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=demo` to generate a new component.

## Build

Run `ng build demo` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

- Run `ng test demo` to execute the unit tests via [Jest](https://jestjs.io).
- Run `nx affected:test` to execute the unit tests affected by a change.
- Run `npm run test:all` to run all unit tests in watch mode. They will re-run automatically as you make changes that affect the tests.
