# BuildVu Node.js Client #

Convert PDF to HTML5 or SVG with Node.js, using the BuildVu Node.js Client to interact with IDRsolutions' [BuildVu Microservice Example](https://github.com/idrsolutions/buildvu-microservice-example).

The BuildVu Microservice Example is an open source project that allows you to convert PDF to HTML5 or SVG by running [BuildVu](https://www.idrsolutions.com/buildvu/) as an online service.

-----

# Installation #

```
npm install @idrsolutions/buildvu
```

-----

# Usage #

## Basic: (Upload) #

```javascript
var buildvu = require('@idrsolutions/buildvu');

var endpoint = "http://localhost:8080/microservice-example/buildvu";

buildvu.prepareFile("path/to/file.pdf");

buildvu.convert({
    endpoint: endpoint,
    parameters: {
        // Upload a local file to the server
		input: buildvu.UPLOAD,
        token: "token-if-required"
    },
    
    failure: function() { },
    progress: function() { },
    success: function(e) {
        console.log('Converted ' + e.previewUrl);
    }
    
});
```

## Basic: (Download) #
```javascript
var buildvu = require('@idrsolutions/buildvu');

var endpoint = "http://localhost:8080/microservice-example/buildvu";

//No prepareFile() required

buildvu.convert({
    endpoint: endpoint,
    parameters: {
        // Download a remote file on the server
		input: buildvu.DOWNLOAD,
        url: 'http://example/url/file.pdf'
    },
    
    failure: function() { },
    progress: function() { },
    success: function(e) {
        console.log('Converted ' + e.previewUrl);
    }
    
});
```
The parameters object should contain the parameters that are sent to the API
See the [API](https://github.com/idrsolutions/buildvu-microservice-example/blob/master/API.md) for more details.

See `example.js` for examples.

-----

# Who do I talk to? #

Found a bug, or have a suggestion / improvement? Let us know through the Issues page.

Got questions? You can contact us [here](https://idrsolutions.zendesk.com/hc/en-us/requests/new).

-----

# Code of Conduct #

Short version: Don't be an awful person.

Longer version: Everyone interacting in the BuildVu Node.js Client project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](CODE_OF_CONDUCT.md).

-----

Copyright 2018 IDRsolutions

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
