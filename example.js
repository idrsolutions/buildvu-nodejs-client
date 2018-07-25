/*
 * Copyright 2018 IDRsolutions
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var buildvu = require('./buildvu-client');

function progressListener(e) {
    console.log(JSON.stringify(e));
}

function failureListener(e) {
    console.log(JSON.stringify(e));
    console.log("Failed!");
}

function successListener(e) {
    console.log(JSON.stringify(e));
    console.log("Converted " + e.previewPath);
}


var baseEndpoint = "http://localhost:8080/microservice-example/";
var endpoint = baseEndpoint + "buildvu";

buildvu.convert({
    endpoint: endpoint,
    parameters: {
        token: "token-if-required"
    },
    file: "../../test.pdf",
    progress: progressListener,
    success: successListener,
    failure: failureListener
});
