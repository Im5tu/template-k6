import http from 'k6/http';
import { group } from "k6";
import { loadOptions, parseResponse, loadServiceConfig, withHeaders } from "./lib/k6_extensions.js";

// TODO :: call loadOptions() with the name of the json options that you want to load, eg: loadOptions('default-soak-test')
//         This parameter must be supplied with a value. The directory './options/' will be searched and '.json' appended
export let options = loadOptions('default-load-test');

// TODO :: call loadServiceConfig with the name of the service that you want to load, eg: loadServiceConfig('myservice')
//         This parameter must be supplied with a value. The directory './services/' will be searched and '.json' appended
export let serviceConfig = Object.assign({}, loadServiceConfig('myservice'), {
  getParams: withHeaders(),
  postParams: withHeaders({ "Content-Type": "application/json"})
});

export function setup() { return serviceConfig; }

export default function (data) {
  // TODO :: Update `data.baseUrl` with the extension to your endpoint, eg: data.baseUrl + "public/crocodiles"
  group("GET /YOUR-ENDPOINT", function() {
    parseResponse(http.get(data.baseUrl, data.getParams));
  });

  group("POST /YOUR-ENDPOINT", function() {
    parseResponse(http.post(data.baseUrl, JSON.stringify(getRequestBody()), data.postParams));
  });
};

function getRequestBody()
{
    // TODO :: Update the response to include the details that you wish to send on the POST endpoint above
    return {};
}