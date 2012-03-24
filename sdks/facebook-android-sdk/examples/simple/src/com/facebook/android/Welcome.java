package com.facebook.android;

import android.app.Activity;
import android.os.Bundle;

public class Welcome extends Activity {
	@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.welcome);
    }
}
