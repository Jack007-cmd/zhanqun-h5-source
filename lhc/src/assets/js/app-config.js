var AppConfig = {
  // "apiHost":"http://api.lh8898.com",
  // "h5Host":"http://aapi.lh8898.com",pi.lh8898.com",
  // "imgHost":"http://
  "apiHost": "http://www.123kkc.com",
  "h5Host":"http://www.123kkc.com",
  "imgHost":"http://www.123kkc.com",
  // "apiHost": JudgeRealmName(),
  // "h5Host": JudgeRealmName(),
  // "imgHost": JudgeRealmName(),
  "agentId": 1,
  "localhost": false
};

//判断域名
function JudgeRealmName() {
  var url = document.domain;
  url =  document.location.protocol +"//"+ url;
  // if (url.indexOf(".esuzhan.") == -1) {
  //   url = "http://" + url;
  // } else {
  //   var start = url.indexOf(".") + 1;
  //   var end = url.indexOf(".", start + 1);
  //   url = "http://" + url.replace(url.substring(start, end), "api");
  // }
  return url;
}

