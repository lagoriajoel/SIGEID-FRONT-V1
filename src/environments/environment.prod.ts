import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  //apiURL: 'https://informes-backend.onrender.com'
   apiURL: 'http://localhost:8001'
  //apiURL: 'http://10.0.0.40:8001'

};
