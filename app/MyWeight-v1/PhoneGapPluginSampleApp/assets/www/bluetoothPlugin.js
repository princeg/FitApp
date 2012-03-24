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
 *  
 * @return Instance of Bluetooth
 */
var Bluetooth = function() { 
 
}


/**
 * @param deviceType The type of the device to pair to
 * @param successCallback The callback which will be called when directory listing is successful
 * @param failureCallback The callback which will be called when directory listing encouters an error
 */
Bluetooth.prototype.pair = function(deviceNamePrefix, successCallback, failureCallback) {
	// successCallback required
    if (typeof successCallback != "function") {
        console.log("Bluetooth Error: successCallback is not a function");
        return;
    }
    // errorCallback required
    if (typeof failureCallback != "function") {
        console.log("Bluetooth Error: errorCallback is not a function");
        return;
    }
	
 	return PhoneGap.exec(successCallback,    	//Callback which will be called when the call is successful
						failureCallback,     	//Callback which will be called when the call encounters an error
						'BluetoothPlugin',  	//Telling PhoneGap that we want to run "Bluetooth" Plugin
						'pair',              	//Telling the plugin, which action we want to perform
						[deviceNamePrefix]);        	//Passing a list of arguments to the plugin
};


Bluetooth.prototype.read = function(deviceNamePrefix, successCallback, failureCallback) {
	// successCallback required
    if (typeof successCallback != "function") {
        console.log("Bluetooth Error: successCallback is not a function");
        return;
    }
    // errorCallback required
    if (typeof failureCallback != "function") {
        console.log("Bluetooth Error: errorCallback is not a function");
        return;
    }
	
 	return PhoneGap.exec(successCallback,    	//Callback which will be called when the call is successful
						failureCallback,     	//Callback which will be called when the call encounters an error
						'BluetoothPlugin',  		//Telling PhoneGap that we want to run "Bluetooth" Plugin
						'read',              	//Telling the plugin, which action we want to perform
						[deviceNamePrefix]);        	//Passing a list of arguments to the plugin, in this case this is the directory path
};
 
/**
 * <ul>
 * <li>Register the Bluetooth Javascript plugin.</li>
 * <li>Also register native call which will be called when this plugin runs</li>
 * </ul>
 */
PhoneGap.addConstructor(function() {
	//Register the javascript plugin with PhoneGap
	PhoneGap.addPlugin('Bluetooth', new Bluetooth());
 
	//Register the native class of plugin with PhoneGap
	//PluginManager.addService("BluetoothPlugin","com.ericsson.oae.phonegap.bluetooth.BluetoothPlugin");
});