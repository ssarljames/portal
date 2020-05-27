// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// const host = '192.168.254.104';
const host = 'localhost'

export const environment = {
  production: false,
  app_url: 'cs-cube.now.sh',
  endpoint: `http://${host}:8000/api`,
  image: 'https://scontent.fceb1-1.fna.fbcdn.net/v/t1.0-9/67886435_112616973416965_5052278787446669312_n.jpg?_nc_cat=100&amp;_nc_sid=09cbfe&amp;_nc_eui2=AeHLYqt6sP01dC6ar2iw9ykNUmCoPxuomacYRZTQZToYvo5b8kw8QhhhCfis8mrt9UaE_nIv-kS1j7tg7Aq7e8kLaBty6wkH1LRP7cFy58fArg&amp;_nc_ohc=0On_yxUjxtsAX8d8T_F&amp;_nc_ht=scontent.fceb1-1.fna&amp;oh=4bb23f4526b803bbc026e5bd337d5b62&amp;oe=5E963B9B'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
