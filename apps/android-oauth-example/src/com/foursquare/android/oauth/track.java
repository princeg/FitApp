package com.foursquare.android.oauth;

import java.util.ArrayList;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;

public class track extends Activity {

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);
	    setContentView(R.layout.track);
	    
	    Spinner tSpinner = (Spinner) findViewById(R.id.spinner1);
	    
	    ArrayList<String> options = new ArrayList<String>();
	    options.add("Shoulder");
	    options.add("Legs");
	    options.add("Ankle");
	   
	    tSpinner.setSelection(options.indexOf("Shoulder"));
	    
	    ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,android.R.layout.simple_spinner_item,options);
	    tSpinner.setAdapter(adapter);
	    
	    Button start = (Button) findViewById(R.id.widget71);
		start.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				
			}
		});
		
		
		Button complete = (Button) findViewById(R.id.widget71);
		complete.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				Intent intent = new Intent(track.this, Example.class);
				startActivity(intent);
			}
		});
	    
	}

}
