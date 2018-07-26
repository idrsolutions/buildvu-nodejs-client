# BuildVu Node.js Client #

BuildVu Node.js Client is the Node.js API for IDRSolutions' [BuildVu Microservice Example](https://github.com/idrsolutions/buildvu-microservice-example).

It functions as an easy to use, plug and play library that lets you use [BuildVu](https://www.idrsolutions.com/buildvu/) from Node.js. 

-----

# Installation #

```
npm install @idrsolutions/buildvu
```

-----

# Usage #

## Basic: #

```javascript
var buildvu = require('@idrsolutions/buildvu');

var endpoint = "http://localhost:8080/microservice-example/buildvu";

buildvu.convert({
    endpoint: endpoint,
    parameters: {
        token: "token-if-required"
    },
    file: "your-filename.pdf",
    failure: function() { },
    progress: function() { },
    success: function(e) {
        console.log("Converted " + e.previewUrl);
    }
});
```

See `example.js` for examples.

-----

# Who do I talk to? #

Found a bug, or have a suggestion / improvement? Let us know through the Issues page.

Got questions? You can contact us [here](https://idrsolutions.zendesk.com/hc/en-us/requests/new).

-----

# Code of Conduct #

Short version: Don't be an awful person.

Longer version: Everyone interacting in the BuildVu Node.Js Client project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](CODE_OF_CONDUCT.md). 

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
