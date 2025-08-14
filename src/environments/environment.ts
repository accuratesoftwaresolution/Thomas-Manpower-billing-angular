// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  timeOutLimit: 3600,
  timeOutCountLimit: 120,
  multiTenent: false,
  reportFromJasper: false,
  //Akhila
   apiUrl: 'http://192.168.1.12:4000/api/v1',    
   ApiUrl: 'http://192.168.1.12:4000/api/v1',



  // apiUrl: 'http://59.92.234.180:4000/api/v1',    //Akhila
  // ApiUrl: 'http://59.92.234.180:4000/api/v1',


  // apiUrlReport: "http://192.168.1.10:4000/api/v1'",


  // apiUrl: 'https://api.euroclouderp.com/api/v1',   //Live
  // ApiUrl: 'https://api.euroclouderp.com/api/v1',
   apiUrlReport: "https://api.euroclouderp.com/api/v1",




};
