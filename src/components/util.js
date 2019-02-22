export default {
    queryString(location, key) {
        let result = location.match(new RegExp("[\?\&]" + key + "=([^\&]+)", "i"));
        if (result === null || result.length < 1)
            return "";
        return result[1];
    },
    setviewport(width) {
        var scalar = width,
            scale = parseInt(window.screen.width) / scalar;
        var val = scale.toFixed(2) * 1;
        document.getElementById('viewport').setAttribute('content', 'target-densitydpi=device-dpi,width=' + scalar + ',user-scalable=no,initial-scale=' + val + ',minimum-scale=' + val + ', maximum-scale=' + val + '');
    },
    Bridge(handler, params, callback) {
        // handler: 行为
        //  	handler:{
        //			login 登陆  如果传过来是login  
        //			task 任务界面
        //			wakeup 唤醒(uId:"") 给用户发im，im：APP封装的聊天软件。
        //			recharge 充值，调取充值
        //			share 分享 调取分享  // params: { content: "分享的内容", link: " 分享的链接//www.baidu.com" }
        //			upapp 强制更新 
        //      copy 复制
        //      center //上传照片页，
        //      loadingOpen //打开loading
        //      loadingClose  //关闭loading
        //      userCenter   // profile页 ; params=userID 
        //     openBar  //
        //    closeBar
        //		}
        // params：给APP端传递的参数，具体参数格式需要和APP去沟通。
        // callback：这是前端自己定义的回调函数，APP读取callback
        function back(callback, tags) {
            window[
                tags || (tags = "pie" + (Math.random() + "").substr(2))
            ] =
                callback || "";
            return tags;

        }
        var json = {
            "handler": handler,
            "params": params,
            "callback": back(callback),
        }
        console.log(json)
        var pieUrl = "pie://" + encodeURIComponent(JSON.stringify(json));
        console.log(pieUrl)
        window.location.href = pieUrl;
    },
    apps: {
        'down_urls': {
            android_down_url: "https://play.google.com/store/apps/details?id=com.ganesha.pie",
            android_apk_url: "http://www.letspie.com/download/pie.apk",
            ios_down_url: "itms-apps://itunes.apple.com/cn/app/id1446417893?mt=8"
        },
        'isAndroid': function () {
            var u = navigator.userAgent;
            return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;;
        },
        'isIOS': function () {
            var u = navigator.userAgent;
            return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);;
        }
    },
    Event: {
        addListener: function (target, type, handler) {
            if (target.addEventListener) {
                target.addEventListener(type, handler);
            } else if (target.attachEvent) {
                target.attach("on" + type, function () {
                    handler.call(target); //让handler中的this指向目标元素
                });
            } else {
                target["on" + type] = handler;
            }
        },
        removeListener: function (target, type, handler) {
            if (target.removeEventListener) {
                target.removeEventListener(type, handler);
            } else if (target.detachEvent) {
                target.detachEvent("on" + type, handler);
            } else {
                target["on" + type] = null;
            }
        },
        getEvent: function (e) { //获取事件对象
            var evt = window.event || e;
            return evt;
        },
        getTarget: function (e) { //获得目标对象
            var evt = this.getEvent(e);
            var target;
            if (evt.target) { target = evt.target; }
            else { target = evt.srcElement; }
            return target;
        },
        stopPropagation: function (e) { //阻止冒泡
            var evt = this.getEvent(e);
            if (evt.stopPropagation) { evt.stopPropagation(); }
            else { evt.cancelBubble = true; }
        },
        preventDefault: function (e) { //阻值默认行为的发生
            var evt = this.getEvent(e);
            if (evt.preventDefault) { evt.preventDefault(); }
            else { e.returnValue = false; }
        }
    }
}