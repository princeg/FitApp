package com.foursquare.android.oauth;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class ActivityWebView extends Activity 
{
	public static String token;
  
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webview);
        
        String url = "https://mhealth.att.com/mobile/auth?client_id=exercise&response_type=code&redirect_uri=ase%3A%2F%2Foauthresponse&scope=/admin/health/source/exercise";
            
       
        WebView webview = (WebView)findViewById(R.id.webview);
        webview.getSettings().setJavaScriptEnabled(true);
        webview.setWebViewClient(new WebViewClient() {
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                String fragment = "code=";
                int start = url.indexOf(fragment);
                if (start > -1) {
                    // You can use the accessToken for api calls now.
                	// Use it manually otherwise
                    token = url.substring(start + fragment.length(), url.length());
                 
                    Log.d("Hello ", "OAuth complete, token: [" + token + "].");
                 
                    Intent abc = new Intent(ActivityWebView.this, selection.class);
                    startActivity(abc);
                    finish();
                } 
               
            }
        });
        webview.loadUrl(url);
    } 
}



