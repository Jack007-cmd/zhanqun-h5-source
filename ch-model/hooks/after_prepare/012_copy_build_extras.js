#!/usr/bin/env node
/**
 * cordova支持额外的build-extras.gradle文件用于自定义apk构建
 * 脚本将hooks目录下的build-extras-will-copyto-platformsAndroid.gradle拷贝到platforms/android
 */
var fs = require('fs');
var path = require('path');
var rootdir = process.argv[2];
var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);
if (platforms.indexOf('android') != -1) {
	var gradleFile = fs.readFileSync('hooks/build-extras-will-copyto-platformsAndroid.gradle');
	fs.writeFileSync('platforms/android/build-extras.gradle', gradleFile);
	var settingFile = fs.readFileSync('hooks/buildConfig/build-setting.json');
	fs.writeFileSync('platforms/android/build-setting.json', settingFile);
}
