import { Rate } from "k6/metrics";
import { check, fail } from "k6";

// Tracks error rates that we have in the application
export let errorRate = new Rate("errors");

// Loads the default options and overrides with specific settings
export function loadOptions(optionsFile) {
    return JSON.parse(open("./options/" + optionsFile + ".json"))
}

// Load the configuration specific to that service
export function loadServiceConfig(serviceFile) {
    if (!__ENV.K6_HOSTENV)
        fail('K6_HOSTENV has not be set. Exiting...');

    var config = JSON.parse(open("./services/" + serviceFile + ".json"));
    config = merge(config[__ENV.K6_HOSTENV], { "environment": __ENV.K6_HOSTENV });

    return config;
}

export function withHeaders(overrides) {
    var defaultHeaders = {
        headers: {
            "UserAgent": "K6 Load Test"
        }
    }

    if (!overrides)
        return defaultHeaders;

    return {headers: merge(defaultHeaders.headers, overrides)};
}

export function parseResponse(response) {
    check(response, { "is success status code": r => /20(0|1|2|4)/.test(r.status)}) || logError(response);
}

export function merge (...args) {
    let target = {};
    // Merge the object into the target object
    let merger = (obj) => {
        for (let prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            if (Object.prototype.toString.call(obj[prop]) === '[object Object]'){
              // If we're doing a deep merge 
              // and the property is an object
              target[prop] = merge(target[prop], obj[prop]);
            } else {
              // Otherwise, do a regular merge
              target[prop] = obj[prop];
            }
           }
        }
    };
    //Loop through each object and conduct a merge
    for (let i = 0; i < args.length; i++) {
        merger(args[i]);
    }
    return target;
};

function logError(response) {
    errorRate.add(1);
    console.log("API returned response code '" + response.status + "' for url: " + response.url);
}