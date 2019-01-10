/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <Firebase.h>
#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <RNGoogleSignin/RNGoogleSignin.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>

// **********************************************
// *** DON'T MISS: THE NEXT LINE IS IMPORTANT ***
// **********************************************
#import "RCCManager.h"

// IMPORTANT: if you're getting an Xcode error that RCCManager.h isn't found, you've probably ran "npm install"
// with npm ver 2. You'll need to "npm install" with npm 3 (see https://github.com/wix/react-native-navigation/issues/1)

#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  NSURL *jsCodeLocation;
#ifdef DEBUG
  //  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios&dev=true"];
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif


  // **********************************************
  // *** DON'T MISS: THIS IS HOW WE BOOTSTRAP *****
  // **********************************************
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  [[RCCManager sharedInstance] initBridgeWithBundleURL:jsCodeLocation launchOptions:launchOptions];

  return YES;
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {

//  return [[FBSDKApplicationDelegate sharedInstance] application:application
//                                                                                                                                                                          openURL:url
//                                                                                                                                                                sourceApplication:sourceApplication
//                                                                                                                                                                       annotation:annotation
//                                                                                                                            ];
//
  return [RNGoogleSignin application:application openURL:url sourceApplication:sourceApplication annotation:annotation] || [[FBSDKApplicationDelegate sharedInstance] application:application
    openURL:url
    sourceApplication:sourceApplication
    annotation:annotation
  ];
}

@end
