# mukeEditor

制作一款富文本编辑器，欢迎使用MukeEditor！<br/>

ukeEditor 1.2.1<br/>

优化部分php代码，展示页面默认状态修改，更好体现功能编辑器功能。

准备开发

1、远程图片本地化
2、截图上传

MukeEditor 1.2.0<br/>

新增设置项 filterMode ，脚本标签script过滤功能，主要防止在文中添加js代码，或者引入站外js代码引起的脚本攻击。该功能默认开启，设置方法见下方设置详情的链接。

MukeEditor 1.0.0<br/>

开发原因：由于现有富文本编辑器不是体量太大就是对HTML中video和audio支持不好，所以才决定着手写了这个富文本编辑器。<br/>

特点：麻雀虽小五脏俱全，MukeEditor是一款所见即所得富文本web编辑器，具有轻量，使用便利，可定制，多语言支持，注重用户体验等特点。<br/>

开发感言：开发初期由于对富文本编辑器了解非常少导致进度非常缓慢，初始版本断断续续开发共耗时约有一周左右，希望能对网站开发者有所帮助。<br/>

<br/>
使用方法<br/>
<br/>

<textarea id="editor"></textarea><br/>

<script src="mukeEditor.js"></script><br/>
<script><br/>
var editor = MK.getEditor('editor');<br/>
</script><br/>
<br/>

设置详情 https://github.com/amuke123/mukeEditor/wiki

Copyright © amuker.com All rights reserved.<br/>
