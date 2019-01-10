package com.onblast;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import android.content.Intent;
import com.reactnativenavigation.controllers.ActivityCallbacks;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oney.WebRTCModule.WebRTCModulePackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;
import com.imagepicker.ImagePickerPackage;
import org.reactnative.camera.RNCameraPackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import com.shahenlibrary.RNVideoProcessingPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication implements ShareApplication {

     private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

     protected static CallbackManager getCallbackManager() {
         return mCallbackManager;
     }

     @Override
     public void onCreate() {
        super.onCreate();

        setActivityCallbacks(new ActivityCallbacks() {
            @Override
            public void onActivityResult(int requestCode, int resultCode, Intent data) {
                mCallbackManager.onActivityResult(requestCode, resultCode, data);
            }
        });

        FacebookSdk.sdkInitialize(getApplicationContext());
    }

     @Override
     public boolean isDebug() {
         // Make sure you are using BuildConfig from your own application
         return BuildConfig.DEBUG;
     }

     protected List<ReactPackage> getPackages() {
         // Add additional packages you require here
         // No need to add RnnPackage and MainReactPackage
         return Arrays.<ReactPackage>asList(
             new RNFirebasePackage(),
             new RNFirebaseAuthPackage(),
             new RNFirebaseDatabasePackage(),
             new RNFirebaseStoragePackage(),
             new RNSpinkitPackage(),
             new ReactVideoPackage(),
             new WebRTCModulePackage(),
             new RNGoogleSigninPackage(),
             new RNSharePackage(),
             new ImagePickerPackage(),
             new RNCameraPackage(),
             new LinearGradientPackage(),
             new RNVideoProcessingPackage(),
             new SvgPackage(),
             new RNFetchBlobPackage(),
             new FBSDKPackage(mCallbackManager),
             new SplashScreenReactPackage()
         );
     }

     @Override
     public List<ReactPackage> createAdditionalReactPackages() {
         return getPackages();
     }

     @Override
     public String getJSMainModuleName() {
         return "index";
     }

     @Override
     public String getFileProviderAuthority() {
         return "com.onblast.provider";
     }
 }
