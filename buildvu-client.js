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

var request = require('request');
var fs = require('fs');

(function() {
    var Converter = (function() {

        var doPoll = function(uuid, endpoint) {
            var req, retries = 0;

            var poll = setInterval(function() {
                if (!req) {
                    req = request(endpoint + "?uuid=" + uuid, function(error, response, body) {
                        if (!error && response.statusCode === 200) {
                            var data = JSON.parse(body);
                            if (data.state === "processed") {
                                clearInterval(poll);
                                if (success) {
                                    success(data);
                                }
                            } else {
                                if (progress) {
                                    progress(data);
                                }
                            }
                        } else {
                            retries++;
                            if (retries > 3) {
                                clearInterval(poll);
                                if (!error) {
                                    error = new Error(JSON.stringify(response.toJSON()));
                                }
                                if (failure) {
                                    failure(error);
                                }
                            }
                        }
                        req = null;
                    });
                }

            }, 500);
        };

        var resetFile = function() {
            file = undefined;
        };

        var progress, success, failure;
        var file;

        return {
            UPLOAD: 'upload',
            DOWNLOAD: 'download',
            prepareFile: function(fileValue, filename) {
                var size, bytes = 0;
                
                var dataListener = function(chunk) {
                    if (progress) {
                        progress({
                            state: 'uploading',
                            loaded: bytes += chunk.length,
                            total: size
                        });
                    }
                };
                
                if (typeof(fileValue) === 'string' || fileValue instanceof String) {
                    file = fs.createReadStream(fileValue).on('data', dataListener);
                    size = fs.lstatSync(file.path).size;
                } else if (fileValue instanceof fs.ReadStream) {
                    file = fileValue.on('data', dataListener);
                    size = fs.lstatSync(file.path).size;
                } else if (fileValue instanceof Buffer) {
                    if (!filename) {
                        throw Error('Missing filename');
                    }
                    file = {
                        value: fileValue,
                        options: {
                            filename: filename,
                            contentType: 'application/pdf'
                        }
                    };
                } else {
                    throw Error('Did not recognise type of file');
                }
            },
            convert: function(params) {
                if (!params.endpoint) {
                    throw Error('Missing endpoint');
                }
                if (params.success && typeof params.success === "function") {
                    success = params.success;
                }
                if (params.failure && typeof params.failure === "function") {
                    failure = params.failure;
                }
                if (params.progress && typeof params.progress === "function") {
                    progress = params.progress;
                }

                var formData = params.parameters || {};
                
                if (formData.input === this.UPLOAD) {
                    formData.file = file;
                }

                var options = {
                    method: 'POST',
                    uri: params.endpoint,
                    formData: formData
                };

                request(options, function(error, response, body) {
                    if (!error && response.statusCode === 200) {
                        if (formData.callbackUrl && !(params.success || params.progress)) {
                            //Exit without a failure
                        } else {
                            doPoll(JSON.parse(body).uuid, params.endpoint);
                        }
                    } else {
                        if (failure) {
                            failure(error || new Error(JSON.stringify(response.toJSON())));
                        }
                    }
                });
                
                if (formData.input === this.UPLOAD) {
                    resetFile();
                }
            }
        };
    })();


    if(typeof define === "function" && define.amd) {
        //noinspection JSUnresolvedFunction
        define(['converter'], [], function() {
            return Converter;
        });
    } else if(typeof module === "object" && module.exports) {
        module.exports = Converter;
    }

})();
