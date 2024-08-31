// ==UserScript==
// @name         网易云网页版删除已读私信
// @namespace    http://tampermonkey.net/
// @version      2024-08-30
// @description  网易云网页版删除已读私信,不删除云音乐小秘书
// @author       二狗鸭
// @match        *music.163.com*private
// @icon         https://s1.music.126.net/style/favicon.ico
// @grant        none
// @version      0.1
// ==/UserScript==

(function () {
    'use strict';
    // https://music.163.com/*/private*
    console.log('test成功');

    function run_script() {
        var iframe = document.getElementById('g_iframe');
        var all_list = iframe.contentDocument.querySelectorAll("#main-box > div >div:nth-child(3) >div");
        all_list.forEach(one_d => {
            let v = one_d.attributes['data-count'].value;
            if (v === '0' && one_d.attributes['data-nickname'].value != '云音乐小秘书') {
                console.log('可以删除', one_d.attributes['data-nickname'].value)
                // 点击删除
                one_d.querySelector('a.s-fc7').click()
                // 点击确定
                iframe.contentDocument.querySelector(".u-btn2.u-btn2-2.u-btn2-w2").click()
            } else {
                console.log('不能删除', one_d.attributes['data-nickname'].value)
            }
        })
    }

    window.addEventListener('load', function () {
        // 在这里编写你想要在网页加载完成后执行的代码
        console.log('网页加载完成，执行代码');
        var btn = document.createElement('button')
        btn.innerHTML = "一键删除已读私信"
        btn.className = "a-b-c-d-toTop"
        btn.onclick = function (e) {
            run_script()
        }
        var body = document.body
        var style = document.createElement('style')
        style.id = "a-b-c-d-style"
        var css = `.a-b-c-d-toTop{
            position: fixed;
            bottom: 50%;
            right: 5%;
            width: 70px;
            height: 70px;
            z-index: 999;
            cursor: pointer;
            font-size: 16px;
            overflow: hidden;
            background-color: #dc3545; /* 设置背景颜色为红色 */
            color: #ffffff;
            }`
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        body.appendChild(btn)
        body.appendChild(style)

    });

})();
