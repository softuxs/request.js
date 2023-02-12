class HTTP {
  constructor() {
    this.client = new XMLHttpRequest();
  }

  request(options, callback = false) {
    
    // Step 1: Prepare an URL
    var public_url = new URL(options.URL);
    var client = this.client;

    // Step 1: If contains params for send
    if ( options.hasOwnProperty("params") ) {
      for (const key in options.params) {
        public_url.searchParams.append(key, options.params[key]);
      }
    }

    // Step 2: Define settings in client
    client.open(options.method, public_url.toString(), true);

    // Step 3: If contains headers for send
    if ( options.hasOwnProperty("headers") ) {
      for (const key in options.headers) {
        client.setRequestHeader(key, options.headers[key]);
      }
    }

    // Step 4: Add event listeners
    if ( options.hasOwnProperty("events") ) {
      for (const key in options.events) {
        client.addEventListener(key, event => {
          options.events[key](event);
        })
      }
    }

    // Step 5: If contains body
    if ( options.hasOwnProperty("body") ) {
      client.send(options.body);
    } else {
      client.send(null);
    }

    // For every status change, calling this function
    client.onreadystatechange = function (event) {
      if ( this.readyState == client.DONE ) {

        // Get all headers with plan text, and parse for an array
        var planText = this.getAllResponseHeaders();
        var headers = {};

        // Transform text in array
        var array = planText.trim().split(/[\r\n]+/);
        array.forEach(function (line) {
          const parts = line.split(': ');
          const header = parts.shift();
          const value = parts.join(': ');
          headers[header] = value;
        });

        // Define status code in headers
        headers["statusCode"] = this.status;
        callback ? callback(headers, this.response) : false;
      }
    }

  }

  // The alias for request() method, with "method" key completed
  // with "GET"
  GET(options, callback = false) {
    options.method = "GET"; this.request(options, callback);
  }

  // The alias for request() method, with "method" key completed
  // with "POST"
  POST(options, callback = false) {
    options.method = "POST"; this.request(options, callback);
  }

  // The alias for request() method, with "method" key completed
  // with "PUT"
  UPDATE(options, callback = false) {
    options.method = "PUT"; this.request(options, callback);
  }

  // The alias for request() method, with "method" key completed
  // with "DELETE"
  DELETE(options, callback = false) {
    options.method = "DELETE"; this.request(options, callback);
  }

  // The alias for request() method, with "method" key completed
  // with "OPTIONS"
  OPTIONS(options, callback = false) {
    options.method = "OPTIONS"; this.request(options, callback);
  }

  // The alias for request() method, with "method" key completed
  // with "PUT"
  PUT(options, callback = false) {
    options.method = "PUT"; this.request(options, callback);
  }
  
}

class URLS {
  constructor() {
    var local = window.location.protocol + "//" + window.location.hostname;
    this.local = local.toLocaleLowerCase();
    this.current = this.local + window.location.pathname;
  }
}

const MyRequest = new HTTP();

var local = '';
var i = window.location.pathname.replace('/', '');
var parts = i.split('/');
parts.pop();
var x = '';

for (var k of parts) {
  x += k + '/';
}

local = window.location.protocol + "//" + window.location.hostname + '/' + x;