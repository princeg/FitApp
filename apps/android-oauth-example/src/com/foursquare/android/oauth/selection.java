package com.foursquare.android.oauth;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class selection extends Activity {

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.selection);

		Button manual = (Button)findViewById(R.id.button1);
		manual.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				Intent intent = new Intent(selection.this, manual.class);
				startActivity(intent);
			}
		});

		Button track = (Button)findViewById(R.id.button2);
		track.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				Intent intent = new Intent(selection.this, track.class);
				startActivity(intent);
			}
		});
		// TODO Auto-generated method stub
	}


	@Override
	protected void onNewIntent(Intent intent) {
		checkOAuthReturn(intent);
	}

	private void checkOAuthReturn(Intent intent) {
		Uri uri = intent.getData();

		if (uri != null && uri.toString().startsWith("ase://oauthresponse")) {

			Log.d("Hello1234", uri.toString());


		}   
	}

}
