// ==UserScript==
// @name         ksCopyTools
// @name:zh      快手工具 chazz
// @namespace    https://gitee.com/chazzcfb/kscopyTools
// @version      0.5
// @description  快手辅助工具
// @author       chazz <chazzcfb@163.com>
// @include        *://s.kwaixiaodian.com/*
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/clipboard.js/2.0.6/clipboard.min.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

   
    $(document).ready(function () {

        $("body").append('<div style="position: fixed;min-width: 100px;z-index: 9999999999;padding: 10px;bottom: 500px;right: 25px;" id="ch-box"><button style="color:#fff;width:100px;line-height: 40px;background-color:red;font-size:18px;border: 1px;" id="ch-bang" value=0>提取数据</button></div>');

    
        $("#ch-bang").click(function () {
            var btnval = $("#ch-bang").val();//获取按钮状态0位提取数据，1为复制数据
            if (btnval == 0) {
                //提取数据，然后点复制按钮
                var obj = $("span.ant-descriptions-item-content");
                var expressNo = $(".express-no").text();
                var expressCompany = $(".express-company").text();
                var orderNo = obj.eq(0).text();// 订单编号
                var userInfo = obj.eq(6).text().split(','); //用户收货信息
                var addir = trim(userInfo[0]);
                var txts = orderNo + "\t" + addir + "\t" + userInfo[2] + "\t" + expressCompany + "\t" + expressNo;
                console.log(txts);
                $("#ch-bang").attr("data-clipboard-text", txts).css("background-color", "DodgerBlue").text("复制数据").val(1);
            } else {
                $("#ch-bang").text("提取数据").css("background-color", "red").val(0);
            }

            copy();
        });

    });

    //去除字符两边的空白字符

    function trim(s) {

        //    \s表示匹配任何空白字符，包括空格、制表符、换页符等
        //    ^\s*匹配字符串前的所有空白字符
        //    \s*$匹配字符串后的所有空白字符
        //     g表示尽可能多的匹配结果
        var str = s.replace(/(^\s*)|(\s*$)/g, "");
        return str;
    }
    /**
 * 拷贝方法
 */
    function copy() {
        //console.log("copy方法初始化");
        //init
        var clipboard = new ClipboardJS('#ch-bang');
        clipboard.on('success', function (e) {
            console.info(e.text + "\n -复制成功！");

            e.clearSelection();
        });
        clipboard.on('error', function (e) {
            console.info("复制失败！");

        });

    }


    // Your code here...
})();