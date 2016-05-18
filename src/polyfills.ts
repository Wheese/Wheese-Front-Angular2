import 'core-js';
require('zone.js/dist/zone');

if ('production' === process.env.ENV) {


} else {
  // Development

  Error["stackTraceLimit"] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
  
}
