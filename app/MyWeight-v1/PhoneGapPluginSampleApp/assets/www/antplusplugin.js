/*
 * Copyright 2011 Ericsson Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


/**
 * constants
 */
var HEART_RATE = "HEART_RATE";
var WEIGHT_SCALE = "WEIGHT_SCALE";
var FOOT_POD = "FOOT_POD";

/**
 *  
 * @return Instance of AntPlus
 */
var AntPlus = function() { 
 
}

AntPlus.prototype.destroy = function(successCallback, failureCallback) {
	// successCallback required
    if (typeof successCallback != "function") {
        console.log("AntPlus Error: successCallback is not a function");
        return;
    }

    // errorCallback required
    if (typeof failureCallback != "function") {
        console.log("AntPlus Error: errorCallback is not a function");
        return;
    }
	
 	return PhoneGap.exec(successCallback,    	//Callback which will be called when the call is successful
						failureCallback,     	//Callback which will be called when the call encounters an error
						'AntPlusPlugin',  		//Telling PhoneGap that we want to run "AntPlus" Plugin
						'destroy',              	//Telling the plugin, which action we want to perform
						[]);        			//Passing a list of arguments to the plugin, in this case this is the directory path
};



/**
 * @param deviceType The type of the device to pair to
 * @param successCallback The callback which will be called when directory listing is successful
 * @param failureCallback The callback which will be called when directory listing encouters an error
 */
AntPlus.prototype.pair = function(deviceType, successCallback, failureCallback) {
	// successCallback required
    if (typeof successCallback != "function") {
        console.log("AntPlus Error: successCallback is not a function");
        return;
    }

    // errorCallback required
    if (typeof failureCallback != "function") {
        console.log("AntPlus Error: errorCallback is not a function");
        return;
    }
	
	if (deviceType != HEART_RATE && deviceType != WEIGHT_SCALE && deviceType != FOOT_POD) {
		console.log("AntPlus Error: deviceType has invalid value");
		return;
	}
	
 	return PhoneGap.exec(successCallback,    	//Callback which will be called when the call is successful
						failureCallback,     	//Callback which will be called when the call encounters an error
						'AntPlusPlugin',  		//Telling PhoneGap that we want to run "AntPlus" Plugin
						'pair',              	//Telling the plugin, which action we want to perform
						[deviceType]);        	//Passing a list of arguments to the plugin, in this case this is the directory path
};


AntPlus.prototype.read = function(deviceType, successCallback, failureCallback) {
	// successCallback required
    if (typeof successCallback != "function") {
        console.log("AntPlus Error: successCallback is not a function");
        return;
    }

    // errorCallback required
    if (typeof failureCallback != "function") {
        console.log("AntPlus Error: errorCallback is not a function");
        return;
    }
	
	if (deviceType != HEART_RATE && deviceType != WEIGHT_SCALE && deviceType != FOOT_POD) {
		console.log("AntPlus Error: deviceType has invalid value");
		return;
	}
	
 	return PhoneGap.exec(successCallback,    	//Callback which will be called when the call is successful
						failureCallback,     	//Callback which will be called when the call encounters an error
						'AntPlusPlugin',  		//Telling PhoneGap that we want to run "AntPlus" Plugin
						'read',              	//Telling the plugin, which action we want to perform
						[deviceType]);        	//Passing a list of arguments to the plugin, in this case this is the directory path
};
 
/**
 * <ul>
 * <li>Register the Ant+ Javascript plugin.</li>
 * <li>Also register native call which will be called when this plugin runs</li>
 * </ul>
 */
PhoneGap.addConstructor(function() {
	//Register the javascript plugin with PhoneGap
	PhoneGap.addPlugin('AntPlus', new AntPlus());
 
	//Register the native class of plugin with PhoneGap
	//PluginManager.addService("AntPlusPlugin","com.ericsson.oae.phonegap.antplus.AntPlusPlugin");
});