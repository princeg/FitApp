package com.foursquare.android.oauth;

import java.io.InputStream;
import java.util.ArrayList;
import org.apache.http.HttpResponse;
import org.apache.http.HttpVersion;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ClientConnectionManager;
import org.apache.http.conn.params.ConnManagerPNames;
import org.apache.http.conn.params.ConnPerRouteBean;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.SingleClientConnManager;
import org.apache.http.message.BasicHeader;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpParams;
import org.apache.http.params.HttpProtocolParams;
import org.apache.http.protocol.HTTP;
import org.json.JSONObject;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;

public class manual extends Activity {

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {

		super.onCreate(savedInstanceState);
		setContentView(R.layout.manual);

		Spinner mSpinner = (Spinner) findViewById(R.id.spinner1);

		ArrayList<String> options = new ArrayList<String>();
		options.add("Shoulder");
		options.add("Legs");
		options.add("Neck");

		mSpinner.setSelection(options.indexOf("Shoulder"));

		ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
				android.R.layout.simple_spinner_item, options);
		mSpinner.setAdapter(adapter);

		Button btn = (Button) findViewById(R.id.widget71);
		btn.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				sendJson(10);
				Intent intent = new Intent(manual.this, Example.class);
				startActivity(intent);
			}
		});

		// TODO Auto-generated method stub
	}
	
	protected void sendJson(final int reps) {
		final String token;
		
		SchemeRegistry schemeRegistry = new SchemeRegistry();
		schemeRegistry.register(new Scheme("http", PlainSocketFactory.getSocketFactory(), 80));
		schemeRegistry.register(new Scheme("https", new EasySSLSocketFactory(), 443));
		 
		final HttpParams params = new BasicHttpParams();
		params.setParameter(ConnManagerPNames.MAX_TOTAL_CONNECTIONS, 30);
		params.setParameter(ConnManagerPNames.MAX_CONNECTIONS_PER_ROUTE, new ConnPerRouteBean(30));
		params.setParameter(HttpProtocolParams.USE_EXPECT_CONTINUE, false);
		HttpProtocolParams.setVersion(params, HttpVersion.HTTP_1_1);
		 
		final ClientConnectionManager cm = new SingleClientConnManager(params, schemeRegistry);
		
		
		token = ActivityWebView.token;
		
        Thread t = new Thread(){
        public void run() {
                Looper.prepare(); //For Preparing Message Pool for the child Thread
                HttpClient client = new DefaultHttpClient(cm, params);;
                //HttpConnectionParams.setConnectionTimeout(client.getParams(), 10000); //Timeout Limit
                HttpResponse response;
                JSONObject json = new JSONObject();
                try{
                    HttpPost post = new HttpPost("http://api-mhealth.att.com/v2/health/source/exercise/data/v2/health/source/exercise/data?oauth_token=d8569910-5a2d-473e-be5c-3bd6ed5240b1");
                    json.put("reps", reps);
             
                    StringEntity se = new StringEntity( "JSON: " + json.toString());  
                    se.setContentEncoding(new BasicHeader(HTTP.CONTENT_TYPE, "application/json"));
                    post.setEntity(se);
                    
                    response = client.execute(post);
                    /*Checking response */
                    if(response!=null){
                        InputStream in = response.getEntity().getContent(); //Get the data in the entity
                        Log.d("Error", in.toString());
                        
                        
                    }    
                }
                catch(Exception e){
                    e.printStackTrace();
                    
                }
                Looper.loop(); //Loop in the message queue
            }
        };
        t.start();      
    }
	
}