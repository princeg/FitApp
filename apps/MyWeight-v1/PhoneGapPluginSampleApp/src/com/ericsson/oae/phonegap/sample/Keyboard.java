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
package com.ericsson.oae.phonegap.sample;

import com.phonegap.DroidGap;

import android.content.Context;
import android.util.Log;
import android.view.inputmethod.InputMethodManager;
import android.webkit.WebView;

public class Keyboard {
	private static String TAG = Keyboard.class.getSimpleName();
	private WebView mAppView;
    private DroidGap mGap;

    public Keyboard(DroidGap gap, WebView view) {
        mAppView = view;
        mGap = gap;
    }

    public void showKeyboard() {
    	Log.d(TAG, "showKeyboard()");
        InputMethodManager mgr = (InputMethodManager) mGap.getSystemService(Context.INPUT_METHOD_SERVICE);
//        mgr.showSoftInput(mAppView, InputMethodManager.SHOW_FORCED);
        mgr.toggleSoftInput(0, 0);
    }
    
    public void hideKeyboard() {
    	Log.d(TAG, "hideKeyboard()");
        InputMethodManager mgr = (InputMethodManager) mGap.getSystemService(Context.INPUT_METHOD_SERVICE);
        mgr.hideSoftInputFromWindow(mAppView.getWindowToken(), 0);
    }
}
