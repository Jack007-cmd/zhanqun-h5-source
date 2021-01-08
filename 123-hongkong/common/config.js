let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config = 'http://806.zhanqun.com'
    // url_config = 'http://675.zhanqun.com'
}else{
    // 生产环境
    url_config = document.location.protocol +"//"+ document.domain;
}

export default url_config