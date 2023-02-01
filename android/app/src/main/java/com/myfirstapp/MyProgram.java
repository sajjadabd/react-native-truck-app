package com.myfirstapp; // replace com.your-app-name with your app’s name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

import android.util.Log;

public class MyProgram extends ReactContextBaseJavaModule {
	
  MyProgram(ReactApplicationContext context) {
    super(context);
  }
   
   @Override
  public String getName() {
    return "MyProgram";
  }
  
  @ReactMethod(isBlockingSynchronousMethod = true)
  public void printLog() {
	  Log.d("tag","Hello From android");
  }

  

}