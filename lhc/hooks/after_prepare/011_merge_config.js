#!/usr/bin/env node
//hooks目录下新建 configDaily.json为测试环境配置,/www目录下新建config.json为默认配置
//输入命令 ionic build android -Pdaily会将dailyConfig 和config.json合并类似angular.extend，覆盖原来的config.json
//后续用require加载config.json

var fs = require('fs');
var path = require('path');
var readline = require('readline');

var rootdir = process.argv[2];
var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);
var cmdLine = process.env.CORDOVA_CMDLINE;


for(var x=0; x<platforms.length; x++) {
	var platform = platforms[x].trim().toLowerCase();
	var fromConfigJson = getFromFileJson();
	//设置渠道
  	var agent = getAgent();
	if(!fromConfigJson){
		console.log("no -EN,use default config.js");
	}else {
        fromConfigJson["agentId"] = agent.agentId;
        fs.writeFileSync(getTargetPath(x), "var AppConfig=" + JSON.stringify(fromConfigJson), 'utf8');
    }

	if(platform == 'android') {
		//将渠道号写入一个文件,便于打包时获取
		var setting = getFileJson("hooks/buildConfig/build-setting.json");
		var en = getEN();
		if(en){
			setting.en = en;
		}
		setting.agentId = agent.agentId;
		if(isBatch()){
			setting.isBatch = true;
			createBatchFileInPluginsExtraFile(fromConfigJson);
		}else{
			setting.isBatch = false;
		}

		fs.writeFileSync("hooks/buildConfig/build-setting.json",JSON.stringify(setting), 'utf8');
	}
	//额外的文件处理
	var wwwExtraFile =  "wwwExtra/"+agent.agentId;
	if(fs.existsSync(wwwExtraFile)){
		var fileList = [];
		walk(wwwExtraFile,fileList);
		fileList.forEach(function(file){
			var targetFilePath;
			if(platform == 'android') {
			    targetFilePath = 'platforms/'+platform+"/assets/www"+file.path.replace(wwwExtraFile,"");
			} else {
			    targetFilePath = 'platforms/'+platform+"/www"+file.path.replace(wwwExtraFile,"");
			}
			if(file.isDirectory){
				if(!fs.existsSync(targetFilePath)){
					fs.mkdirSync(targetFilePath);
				}
			}else{
				var tofile =fs.readFileSync(file.path);
				fs.writeFileSync(targetFilePath,tofile);
			}
		})
	}
	//额外的文件处理
	var pluginsExtraFile =  "pluginsExtra/"+platform;
	if(fs.existsSync(pluginsExtraFile)){
		var fileList = [];
		walk(pluginsExtraFile,fileList);
		fileList.forEach(function(file){
			var targetFilePath;
			if(platform == 'android') {
			    targetFilePath = 'platforms/'+platform+"/"+file.path.replace(pluginsExtraFile,"");
			} else {
			    targetFilePath = 'platforms/'+platform+"/"+file.path.replace(pluginsExtraFile,"");
			}

			if(file.isDirectory){
				if(!fs.existsSync(targetFilePath)){
					fs.mkdirSync(targetFilePath);
				}
			}else{
				var tofile =fs.readFileSync(file.path);
				fs.writeFileSync(targetFilePath,tofile);
			}
		})
	}
}

function createBatchFileInPluginsExtraFile(targetConfigJson){
	var agentIds = fs.readFileSync("hooks/buildConfig/agentIds.txt", 'utf8').split(/\r\n|\n/);
	agentIds.forEach(function(agentId){
		targetConfigJson["agentId"] = agentId;
		var path = 	"pluginsExtra/android/agent/"+agentId+"/assets/www/assets/js/";
		if (!fs.existsSync(path)) {
            mkdirsSync(path);
		}
		fs.writeFileSync(path+"app-config.js", "var AppConfig="+JSON.stringify(targetConfigJson), 'utf8');
	})
}


function getFileJson(path){
	return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function getTargetPath(x){
	var platform = platforms[x].trim().toLowerCase();
	var targetFilePath;
	if(platform == 'android') {
		targetFilePath = path.join('platforms', platform, 'assets', 'www','assets','js','app-config.js');
	} else {
		targetFilePath = path.join('platforms', platform, 'www','assets','js','app-config.js');
	}
	return targetFilePath;
}

function  getFromFileJson(){
	var env = getEN();
	if(env){
		return getFileJson(path.join('hooks','config','appConfig_'+env+'.json'));
	}
	return null;
}

function getEN(){
	if(cmdLine.indexOf('-EN') != -1){
		return cmdLine.match(/-EN(\w+)/)[1];
	}
	return null;
}

function isBatch(){
	if(cmdLine.indexOf('--batch') != -1){
		return true;
	}
	return false;
}
//是否有马甲包
function getMajia(){
	if(cmdLine.indexOf('--majia') != -1){
		return cmdLine.match(/--(majia\w+)/)[1];
	}
	return "";
}

function getAgent(){
	var agent;
	if(cmdLine.indexOf('-AG') == -1){
		//默认渠道号
		if(platforms[x].trim().toLowerCase() == 'android') {
			agent = "4";
		}else{
			agent = "5";
		}
	}else{
		agent = cmdLine.match(/-AG(\w+)/)[1];
	}
	return {agentId:agent};
}


function extendJson(dst) {
	  var objs = [].slice.call(arguments, 1);
	  for (var i = 0, ii = objs.length; i < ii; ++i) {
	    var obj = objs[i];
	    if (!obj) continue;
	    var keys = Object.keys(obj);
	    for (var j = 0, jj = keys.length; j < jj; j++) {
	      var key = keys[j];
	      var src = obj[key];
	      if (typeof src === 'object') {
	          if (!typeof dst[key] === 'object') dst[key] = Array.isArray(src) ? [] : {};
	          extend(dst[key],src);
	      } else {
	    	  dst[key] = src;
	      }
	    }
	  }
	  return dst;
}


function walk(path,fileList){
	  var dirList = fs.readdirSync(path);
	  dirList.forEach(function(item){
	    if(fs.statSync(path + '/' + item).isFile()){
    	  var state = {};
	      state.path = path + '/' + item;
	      fileList.push(state);
	    }
	  });
	  dirList.forEach(function(item){
	    if(fs.statSync(path + '/' + item).isDirectory()){
		  var state = {};
	      state.path = path + '/' + item;
	      state.isDirectory = true;
	      fileList.push(state);
	      walk(path + '/' + item,fileList);
	    }
	  });
}


function mkdirsSync(dirpath) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp)) {
                    return false;
                }
            }
        });
    }
    return true;
}
