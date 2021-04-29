//console.log(document.currentScript.src);
(function (window){
	window.MK={
		config:{
			width:'100%',
			height:"280px",
			language:"zh-CN",
			style:"style",
			autoHeight:true,
			uploadKey:false,
			uploadUrl:"",
			uploadPath:"",
			navs:['html','|','bold','italic','underline','strike','fontSize','fontFamily','paragraph','color','backColor','|',
				'orderedList','unorderedList','left','center','right','full','indent','outdent','subscript','superscript','|',
				'link','unlink','textBlock','code','hr','selectAll','removeStyle','removeHtml','|',
				'image','audio','video','file','|'/**,'cut','copy','paste','delete'**/,'undo','redo','|','about'],
			fileType:{image:["jpg","jpeg","gif","png"],audio:["mp3","wav"],video:["avi","mp4","ogg","rm"],file:["rar","zip","txt","pdf","docx","doc","xls","xlsx"]},
		},
		options:{
			version:"1.1.0",/**版本**/
			lang:{},/**语言包数据**/
			id:'',/**文本框id**/
			Path:'',/**本文件地址**/
			Host:'',/**主机名**/
			PathPre:'',/**去域名文件地址**/
			langPath:'',/**语言包文件地址**/
			preKey:false,/**pre模式开启**/
			htmlKey:false,/**html模式开启**/
			elemBox:'',/**html盒子**/
			navBox:'',/**nav盒子**/
			textBox:'',/**文本框盒子**/
			uploadUrl:"php/upfile.php",
			uploadPath:"themes/uploadfile",
			font:{songti:"SimSun",kaiti:"KaiTi",heiti:"SimHei",yahei:"Microsoft YaHei",andaleMono:"andale mono",arial:"arial",arialBlack:"arial black",comicSansMs:"comic sans ms",impact:"impact",timesNewRoman:"times new roman"},/**字体**/
			code:{js:"JavaScript",html:"HTML",css:"CSS",php:"PHP",pl:"Perl",py:"Python",rb:"Ruby",java:"Java",vb:"ASP/VB",cpp:"C/C++",cs:"C#",xml:"XML",bsh:"Shell",other:"Other"},
			color:{
				base: ["c00000", "ff0000", "ffc000", "ffff00", "92d050", "00b050", "00b0f0", "0070c0", "002060", "7030a0"],
				topic: [["ffffff", "000000", "eeece1", "1f497d", "4f81bd", "c0504d", "9bbb59", "8064a2", "4bacc6", "f79646"], ["f2f2f2", "7f7f7f", "ddd9c3", "c6d9f0", "dbe5f1", "f2dcdb", "ebf1dd", "e5e0ec", "dbeef3", "fdeada"], ["d8d8d8", "595959", "c4bd97", "8db3e2", "b8cce4", "e5b9b7", "d7e3bc", "ccc1d9", "b7dde8", "fbd5b5"], ["bfbfbf", "3f3f3f", "938953", "548dd4", "95b3d7", "d99694", "c3d69b", "b2a2c7", "92cddc", "fac08f"], ["a5a5a5", "262626", "494429", "17365d", "366092", "953734", "76923c", "5f497a", "31859b", "e36c09"], ["7f7f7f", "0c0c0c", "1d1b10", "0f243e", "244061", "632423", "4f6128", "3f3151", "205867", "974806"]],/**颜色**/
			},
			format:["li","pre","h1","h2","h3","h4","h5","h6"],
			funcs:[],/**操作集合**/
		},
		getEditor(box,i){/**入口**/
			this.loading(box,i);return MK;
		},
		loading(box,i){/**加载**/
			i&&this.upConfig(i);
			this.setDir(box);
			this.loadCss(this.config.style);
			this.loadCss('icono');
			this.loadCss('prettify','code');
			this.loadScript(this.options.langPath);
			//this.loadScript('prettify','code');
		},
		upConfig(i){
			for(var n in i){this.config[n]=i[n];}
		},
		loadCss(el,dir='css'){/**css加载**/
			var css=document.createElement('link');
			css.type="text/css",
			css.rel="stylesheet",
			css.href=this.options.Path+'themes/'+dir+'/'+el+'.css';
			var h=document.getElementsByTagName("head");
			h.length ? h[0].appendChild(css):document.documentElement.appendChild(css);
		},
		loadScript(el,dir=''){/**script加载**/
			var script=document.createElement('script');
			script.type="text/javascript";
			if(dir){
				script.src=this.options.Path+dir+'/'+el+'.js';
			}else{
				script.onload=function(){MK.options.lang=langs,MK.disPlay()};
				script.src=el;
				var h=document.getElementsByTagName("head");
				h.length?h[0].appendChild(script):document.documentElement.appendChild(script);
			}
		},
		setDir(box){/**获取当前地址和语言包地址**/
			var temHref=window.document.location.href;
			var temPath=window.document.location.pathname;
			this.options.Host=temPath!='/'?temHref.substring(0,temHref.indexOf(temPath)+1):temHref;
			this.options.PathPre=temPath.substring(1,temPath.lastIndexOf('/')+1);
			this.options.id=box;
			var els=document.getElementsByTagName('script'),src;
			for(var i=0,len=els.length;i<len;i++){
				src=els[i].src||'';
				if(/mukeEditor[\w\-\.]*\.js/.test(src)){
					this.options.Path=src.substring(0,src.lastIndexOf('/')+1);
					this.options.langPath=this.options.Path+'lang/'+this.config.language+'.js';
				}
			}
		},
		disPlay(){/**改变样式**/
			M=document.getElementById(this.options.id);
			M.className=M.className==''?'mk-editor':M.className+' mk-editor';
			this.config.autoHeight?(M.style.minHeight=this.config.height,M.style.height="auto"):(M.style.height=this.config.height,M.style.overflow="auto");
			M.style.display='none';
			var elem = document.createElement('div');
			var nav = document.createElement('div');
			var editor = document.createElement('div');
			editor.className=editor.className==''?'mk-editor':editor.className+' mk-editor';
			this.config.autoHeight?(editor.style.minHeight=this.config.height,editor.style.height="auto"):(editor.style.height=this.config.height,editor.style.overflow="auto");
			editor.setAttribute('contenteditable',true);
			elem.className='mk-box';
			elem.style.width=this.config.width;
			nav.className='mk-nav';
			nav.id='mk-nav';
			nav.innerHTML=this.getNavList();
			M.parentNode.replaceChild(elem,M);
			nav.addEventListener("click",function(event){MK.processInnderDiv(event.target);},false);
			this.options.elemBox=editor;
			this.options.navBox=nav;
			this.options.textBox=M;
			this.options.elemBox.innerHTML=this.options.textBox.value;
			this.options.elemBox.onclick=this.editorClick,this.options.elemBox.onkeydown=function(e){
				var i=e||window.event;
				if(13==(i.keyCode||i.which||i.charCode)){
					MK.setFormat()||i.shiftKey?'':MK.layout("formatBlock","<p>",true);
				}
			};
			this.options.elemBox.onblur=function(e){
				MK.selarea();
				if(MK.options.htmlKey){MK.options.elemBox.innerHTML=MK.options.textBox.value;}else{MK.options.textBox.value=MK.options.elemBox.innerHTML;}
			};
			elem.appendChild(nav);
			elem.appendChild(editor);
			elem.appendChild(M);
		},
		layout(action,tag,key=false){
			key?this.options.elemBox.focus():this.resume();
			tag=tag||null;
			document.execCommand(action,false,tag);
		},
		resume(){
			this.options.elemBox.focus();
			this.selarea(true);
		},
		selarea(key=false){
			if(window.getSelection){
				dom=window.getSelection();
				if(key){
					dom.removeAllRanges();
					dom.addRange(this.options.select);
				}else{
					this.options.select=dom.getRangeAt(0);
				}
			}else{
				if(key){
					document.body.createTextRange().select();
					document.selection.empty();
					document.selection.addRange(this.options.select);
				}else{
					this.options.select=document.selection.createRange();
				}
				if(key){this.options.select=null;}
			}
		},
		setFormat(){/**格式化**/
			for(var dom=this.getNode(),domName=this.getNodeName(dom),key=false;domName!="p"&&domName!="div";){
				if(this.options.format.indexOf(domName)>-1){
					key=true;
					break;
				}
				dom=this.getNextNode(dom);
				domName=this.getNodeName(dom);
			}
			return key;
		},
		getNodeName(e){/**元素名**/
			return e?e.tagName.toLowerCase():'';
		},
		getNextNode(e){/**元素父元素**/
			return window.getSelection?e.parentNode:document.selection?e.parentElement():void 0;
		},
		getNode(){/**光标位置父元素**/
			if(window.getSelection){
				var e=window.getSelection().getRangeAt(0).startContainer;
				return 3==e.nodeType?e.parentNode:null;
			}
			if(document.selection){return document.selection.createRange().parentElement();}
		},
		getNavList(){/**按钮添加**/
			var texts='';
			for(i=0,len=this.config.navs.length;i<len;i++){
				if(this.config.navs[i]=='|'){
					texts+='<b>|</b>';
				}else{
					texts+='<span class="mk-'+this.config.navs[i]+'" id="mk-'+this.config.navs[i]+'" title="'+this.options.lang[this.config.navs[i]]+'"><i class="icono-'+this.config.navs[i]+'"></i></span>';
				}
			}
			return texts;
		},
		processInnderDiv(el){/**点击响应**/
			if(el.getAttribute("class")){
				sparr=el.getAttribute("class").split('-');
				if(!(this.options.htmlKey)||sparr[1]=='html'||sparr[1]=='about'||sparr[0]=='mk'){
					myClass=sparr[1];
					if(this.config.navs.indexOf(myClass)>-1){
						this.options.funcs.push('MK.fc_'+myClass+'("'+myClass+'")');
						var funcsLine=this.options.funcs.length-1;
						eval(this.options.funcs[funcsLine]);
					}
				}
			}
		},
		fc_bold(id){/**加粗**/
			this.layout('bold');
			this.valid('bold');
		},
		fc_italic(id){/**倾斜**/
			this.layout('italic');
			this.valid('italic');
		},
		fc_strike(id){/**删除线**/
			this.layout('strikeThrough');
			this.valid('strike');
		},
		fc_underline(id){/**下滑线**/
			this.layout('underline');
			this.valid('underline');
		},
		fc_center(id){/**居中**/
			this.layout("justifyCenter")
		},
		fc_left(id){/**左对齐**/
			this.layout("justifyLeft")
		},
		fc_right(id){/**右对齐**/
			this.layout("justifyRight")
		},
		fc_full(id){/**两端对齐**/
			this.layout("justifyFull")
		},
		fc_indent(id){/**缩进**/
			this.layout("indent")
		},
		fc_outdent(id){/**取消缩进**/
			this.layout("outdent")
		},
		fc_unlink(id){/**取消链接**/
			this.layout("unlink")
		},
		fc_textBlock(id){/**引用**/
			aStr=this.options.select;
			this.layout('insertHTML','<blockquote class="mk_quote">'+aStr+'<br/></blockquote><p></p>');
		},
		fc_selectAll(id){/**全选**/
			this.layout("selectall")
		},
		fc_removeStyle(id){/**清除格式**/
			this.abolish();
			this.layout("removeFormat")
		},
		fc_removeHtml(id){/**清除多余的HTML代码**/
			this.options.elemBox.innerHTML=this.options.elemBox.innerText.replace(/\r\n/g,"<br/>");
			this.options.elemBox.innerHTML=this.options.elemBox.innerText.replace(/\n/g,"<br/>");
		},
		fc_subscript(id){/**下标**/
			this.layout("subscript");
			this.valid('subscript');
		},
		fc_superscript(id){/**上标**/
			this.layout("superscript")
			this.valid('superscript');
		},
		fc_hr(id){/**水平线**/
			this.layout("insertHorizontalRule")
		},
		fc_orderedList(id){/**有序列表**/
			this.layout("insertOrderedList")
		},
		fc_unorderedList(id){/**无序列表**/
			this.layout("insertUnorderedList")
		},
		fc_undo(id){/**返回**/
			this.layout("undo")
		},
		fc_redo(id){/**撤销**/
			this.layout("redo")
		},
		fc_cut(id){/**剪切**/
			this.layout("cut")
		},
		fc_copy(id){/**复制**/
			this.layout("copy")
		},
		fc_paste(id){/**粘贴**/
			this.layout("paste")
		},
		fc_delete(id){/**删除**/
			this.layout("delete")
		},
		fc_fontSize(id){/**字体大小**/
			this.newbox("fontSize")
		},
		fc_fontFamily(id){/**字体名称**/
			this.newbox("fontFamily")
		},
		fc_paragraph(id){/**标题段落**/
			this.newbox("paragraph")
		},
		fc_color(id){/**字体颜色**/
			this.newbox("color")
		},
		fc_backColor(id){/**字体背景色**/
			this.newbox("backColor")
		},
		fc_link(id){/**超链接**/
			this.newbox("link")
		},
		fc_code(id){/**代码块**/
			this.newbox("code")
		},
		fc_image(id){/**图片**/
			this.newbox("image")
		},
		fc_audio(id){/**音频**/
			this.newbox("audio")
		},
		fc_video(id){/**视频**/
			this.newbox("video")
		},
		fc_file(id){/**附件**/
			this.newbox("file")
		},
		fc_about(id){/**关于**/
			this.newbox("about")
		},
		fc_html(id){/**html模式**/
			if(this.options.htmlKey){
				this.options.htmlKey=this.setHtml(this.getTextBox());
			}else{
				this.options.htmlKey=this.setText(this.getHtmlBox());
			}
			for(var nav in this.config.navs){
				if(this.config.navs[nav]!='|'&&this.config.navs[nav]!='html'&&this.config.navs[nav]!='about'){
					var hiden=document.getElementById(MK.getId(this.config.navs[nav]));
					if(this.options.htmlKey){
						if(!MK.hasClass(hiden,"mk_item")){MK.addClass(hiden,"mk_item");}
					}else{
						if(MK.hasClass(hiden,"mk_item")){MK.removeClass(hiden,"mk_item");}
					}
				}
			}
		},
		newbox(el){
			if(MK.options.navBox.blur(),document.getElementById("mk_div")){this.deldiv();}else{
				var nav=document.getElementById(MK.getId(el));
				nbox=document.createElement("div");
				nbox.className="mk_div";
				nbox.id="mk_div";
				switch(el){
					case 'fontSize':
						txt='<div class="mkn_'+el+'">';
						var d=['10','12','16','18','24','32','48'];
						for(i=0;i<d.length;i++){txt+='<p onclick="MK.doFc(\'fontSize\',\''+(i+1)+'\');" style="font-size:'+d[i]+'px;">'+d[i]+' px</p>';}
						txt+='</div>';
						break;
					case 'fontFamily':
						txt='<div class="mkn_'+el+'">';
						for(var f in this.options.font){txt+='<p onclick="MK.doFc(\'fontName\',\''+this.options.font[f]+'\');" style="font-family:'+this.options.font[f]+';">'+this.options.lang[f]+'</p>';}
						txt+='</div>';
						break;
					case 'paragraph':
						txt='<div class="mkn_'+el+'">';
						for(i=1;i<7;i++){txt+='<h'+i+' onclick="MK.doFc(\'formatBlock\',\'<h'+i+'>\');">'+this.options.lang['biaoti']+i+'</h'+i+'>';}
						txt+='<p onclick="MK.doFc(\'formatBlock\',\'<p>\');">'+this.options.lang['zhengwen']+'</p>';
						txt+='</div>';
						break;
					case 'color':
					case 'backColor':
						txt='<div class="mkn_'+el+'">';
						txt+='<div class="mk_top"><p onclick="MK.doFc(\''+el+'\',\'\');">'+this.options.lang['nocolor']+'</p></div><div class="mkline_bottom">';
						for(var f in this.options.color.base){txt+='<em onclick="MK.doFc(\''+el+'\',\'#'+this.options.color.base[f]+'\');" title="'+this.options.color.base[f]+'" style="background:#'+this.options.color.base[f]+';"></em>';}
						txt+='</div>';
						for(var f in this.options.color.topic){
							txt+='<div>';
							for(var t in this.options.color.topic[f]){txt+='<em onclick="MK.doFc(\''+el+'\',\'#'+this.options.color.topic[f][t]+'\');" title="'+this.options.color.topic[f][t]+'" style="background:#'+this.options.color.topic[f][t]+';"></em>';}
							txt+='</div>';
						}
						txt+='</div>';
						break;
					case 'link':
						txt='<div class="mkn_'+el+'">';
						txt+='<div class="mk_link"><input type="text" class="mk_input" id="mk_urladdr" placeholder="'+this.options.lang['urladdr']+'" />';
						txt+='<strong><input type="checkbox" id="mk_newbar" />'+this.options.lang['newbar']+'</strong><input type="button" class="mk_affirm" onclick="MK.doFc(\'createLink\',\'\');" value="'+this.options.lang['affirm']+'" /></div>';
						txt+='</div>';
						break;
					case 'code':
						txt='<div class="mkn_'+el+'">';
						for(var f in this.options.code){txt+='<p onclick="MK.doFc(\'code\',\''+f+'\');">'+this.options.code[f]+'</p>';}
						txt+='</div>';
						break;
					case 'image':
					case 'file':
						txt='<div class="mkn_'+el+'">';
						txt+='<div class="mk_'+el+'"><input type="text" class="mk_input" id="mk_'+el+'addr" placeholder="'+this.options.lang[el+'addr']+'" />';
						txt+='<input type="button" class="mk_affirm" onclick="MK.doFc(\''+el+'\',\'\');" value="'+this.options.lang['affirm']+'" /></div>';
						txt+='<div class="mk_'+el+'">';
						if(this.config.uploadKey){txt+='<div class="mk_botton"><big>'+this.options.lang['upload'+el]+'</big>';
						txt+='<input type="file" multiple="multiple" name="file[]" id="mk_up'+el+'" class="mk_up" onchange="MK.upFc(\''+el+'\');" /></div></div>';}
						txt+='</div>';
						break;
					case 'audio':
					case 'video':
						txt='<div class="mkn_'+el+'">';
						txt+='<div class="mk_'+el+'"><input type="text" class="mk_input" id="mk_'+el+'addr" placeholder="'+this.options.lang[el+'addr']+'" />';
						txt+='<input type="button" class="mk_affirm" onclick="MK.doFc(\''+el+'\',\'\');" value="'+this.options.lang['affirm']+'" /></div>';
						txt+='<div class="mk_controls"><strong><input type="checkbox" id="mk_autoplay" />'+this.options.lang['autoplay']+'</strong>';
						txt+='<strong><input type="checkbox" id="mk_loop" />'+this.options.lang['loop']+'</strong><strong><input type="checkbox" id="mk_controls" />'+this.options.lang['controls']+'</strong></div>';
						txt+='<div class="mk_'+el+'">';
						if(this.config.uploadKey){txt+='<div class="mk_botton"><big>'+this.options.lang['upload'+el]+'</big>';
						txt+='<input type="file" multiple="multiple" name="file[]" id="mk_up'+el+'" class="mk_up" onchange="MK.upFc(\''+el+'\');" /></div></div>';}
						txt+='</div>';
						break;
					case 'about':
						txt='<div class="mkn_'+el+'">';
						txt+='<div class="mk_about">'+this.options.lang['name']+' '+this.options.version+'';
						txt+='<br/>'+this.options.lang['introduce'];
						txt+='<br/>'+this.options.lang['copyright']+'</div>';
						txt+='</div>';
						break;
					default :
						txt='NULL';break;
				}

				nbox.innerHTML=txt;
				nbox.style.top=nav.offsetTop+nav.offsetHeight+"px";
				MK.options.navBox.appendChild(nbox);
				var H=nav.offsetLeft+nav.offsetWidth/2-nbox.offsetWidth/2;
				if(nav.offsetLeft<nbox.offsetWidth/2){H=5;}
				if(MK.options.navBox.offsetWidth-nav.offsetLeft-nav.offsetWidth<nbox.offsetWidth/2){H=MK.options.navBox.offsetWidth-nbox.offsetWidth-5;}
				nbox.style.left=H+"px";
				nbox.onclick=function(){
					MK.options.navBox.blur();
				}
			}
		},
		doFc(el,data){
			switch(el){
				case 'fontSize':
					this.layout(el,data);break;
				case 'fontName':
					this.layout(el,data);break;
				case 'formatBlock':
					this.layout(el,data);break;
				case 'color':
					if(data==''){this.fc_removeStyle();}else{this.layout('foreColor',data);}break;
				case 'backColor':
					if(data==''){this.fc_removeStyle();}else{this.layout(el,data);}break;
				case 'createLink':
					var linkURL=document.getElementById('mk_urladdr').value;
					var newbar=document.getElementById('mk_newbar').checked;
					linkURL=linkURL==''?' ':linkURL;
					if(newbar){
						aStr=this.options.select;this.layout('insertHTML','<a href="'+linkURL+'" target="_blank">'+aStr+'</a>');
					}else{this.layout(el,linkURL);}
					break;
				case 'code':
					aStr=this.options.select;
					this.layout('insertHTML','<pre class="prettyprint lang-'+data+'">'+aStr+'<br/></pre><p></p>');
					break;
				case 'image':
					if(data){this.layout('insertHTML',data);}else{
						var upURL=document.getElementById('mk_'+el+'addr').value;
						this.layout('insertHTML','<img src="'+upURL+'" />');
					}
					break;
				case 'audio':
				case 'video':
					if(data){this.layout('insertHTML',data);}else{
						var upURL=document.getElementById('mk_'+el+'addr').value;
						var autoplay=document.getElementById('mk_autoplay').checked?' autoplay':'';
						var loop=document.getElementById('mk_loop').checked?' loop':'';
						var controls=document.getElementById('mk_controls').checked?' controls':'';
						this.layout('insertHTML','<p><'+el+' '+autoplay+loop+controls+' src="'+upURL+'"></'+el+'></p><p><br/></p>');
					}
					break;
				case 'file':
					if(data){this.layout('insertHTML',data);}else{
						var upURL=document.getElementById('mk_'+el+'addr').value;
						this.layout('insertHTML','<p><a target="_blank" href="'+upURL+'">'+this.options.lang[el]+'</a></p><p><br/></p>');
					}
					break;
				default:break;
			}
			this.deldiv();
			MK.options.textBox.value=MK.getHtml();
		},
		upFc(el,zdy=''){
			url=this.config.uploadUrl==''?this.options.Host+this.options.PathPre+this.options.uploadUrl:this.options.Host+this.config.uploadUrl;
			path=this.config.uploadPath==''?this.options.PathPre+this.options.uploadPath:this.config.uploadPath;
			if(zdy==''){
				fileObj=document.getElementById("mk_up"+el).files;
			}else{
				fileObj=document.getElementById(zdy).files;
			}
			var data=new FormData();
			if(fileObj.length > 0){
				for(i=0;i<fileObj.length;i++){
					data.append("file["+i+"]",fileObj[i]);
				}
			}
			data.append("imageType",JSON.stringify(this.config.fileType.image));
			data.append("audioType",JSON.stringify(this.config.fileType.audio));
			data.append("videoType",JSON.stringify(this.config.fileType.video));
			data.append("fileType",JSON.stringify(this.config.fileType.file));
			data.append("host",this.options.Host);
			data.append("path",path);
			data.append("type",el);
			this.sendHttpUp(url,data);
		},
		getText(){/**获取纯文本**/
			return this.options.elemBox.innerText;
		},
		getHtml(){/**获取html代码**/
			return this.options.elemBox.innerHTML;
		},
		getTextBox(){/**获取文本框内容**/
			return this.options.textBox.value;
		},
		getHtmlBox(){/**获取div编辑区内容**/
			return this.options.elemBox.innerHTML;
		},
		setText(el){/**设置文本内容**/
			el=this.setBr(el);
			this.options.textBox.style.display="block";
			this.options.elemBox.style.display='none';
			this.options.textBox.value=el;
			return true;
		},
		addbr(){
			var br=document.createElement("br");
			this.options.elemBox.appendChild(br);
		},
		setHtml(el){/**设置html文本内容**/
			this.options.textBox.style.display="none";
			this.options.elemBox.style.display="block";
			this.options.elemBox.innerHTML=el;
			return false;
		},
		abolish(el=''){
			if(el){
				if(this.config.navs.indexOf(el)>-1){
					var n=document.getElementById(MK.getId(this.config.navs[i]));
					MK.hasClass(n,"mk_item")&&(n.click(),MK.removeClass(n,"mk_item"));
				}
			}else{
				for(var i in this.config.navs){
					if(this.config.navs[i]!='|'){
						var n=document.getElementById(MK.getId(this.config.navs[i]));
						MK.hasClass(n,"mk_item")&&(n.click(),MK.removeClass(n,"mk_item"));
					}
				}
			}
		},
		setBr(el){
			var pieces=this.options.format;
			pieces.push('p');
			pieces.push('ol');
			pieces.push('ul');
			pieces.push('div');
			pieces.push('blockquote');
			for(var n in pieces){
				var str="<\/"+pieces[n]+"><";
				el=el.replace(new RegExp(str,'g'),'</'+pieces[n]+'>\n<');
			}
			return el;
		},
		editorClick(){
			if(document.getElementById("mk_div")){MK.deldiv();}
			if(MK.options.preKey){MK.options.preKey=false;}
			temArr=Array("b","i","strike","u","em","strong");
			newArr=Array();
			dataArr=["bold","italic","strike","underline"];
			for(var onNode=MK.getNode(),onName=MK.getNodeName(onNode);temArr.indexOf(onName)>-1;){
				if(onName=="strong"||onName=="b"){onName="bold";}
				if(onName=="em"||onName=="i"){onName="italic";}
				if(onName=="u"){onName="underline";}
				if(onName=="strike"){onName="strike";}
				newArr.push(onName);
				onNode=MK.getNextNode(onNode);
				onName=MK.getNodeName(onNode);
			}
			for(var key in dataArr){showBox=document.getElementById(MK.getId(dataArr[key]));MK.hasClass(showBox,"mk_active")&& MK.removeClass(showBox,"mk_active");}
			if(newArr.length>0)for(var key in newArr){showBox=document.getElementById(MK.getId(newArr[key]));MK.hasClass(showBox,"mk_active")||MK.addClass(showBox,"mk_active");}
			MK.selarea();
		},
		valid(hideid){
			var hiden=document.getElementById(MK.getId(hideid));
			MK.hasClass(hiden,"mk_active")?(MK.removeClass(hiden,"mk_active"),this.options.click=""):(MK.addClass(hiden,"mk_active"),this.options.click=hideid);
		},
		deldiv(){
			this.options.navBox.removeChild(document.getElementById("mk_div"));
		},
		getId(el){
			return "mk-"+el;
		},
		hasClass(el,dc){
			if(el.className){
				if(el.className.match(new RegExp("(\\s|^)"+dc+"(\\s|$)"))){return true;}else{return false;}
			}else{return false;}
		},
		addClass(el,dc){
			el.className+=" "+dc;
		},
		removeClass(el,dc){
			if (this.hasClass(el,dc)) {
				var nRe=new RegExp("(\\s|^)"+dc+"(\\s|$)");
				el.className=el.className.replace(nRe," ");
				el.className=el.className.trim();
			}
		},
		sendHttpUp(_url,_data=""){//post上传文件
			xmlHttp=this.createXmlHttp();
			if(!xmlHttp){
				alert("创建xmlhttprequest对象失败");
			}else{
				url=_url;
				xmlHttp.onreadystatechange = this.callback_bk;
				xmlHttp.open("POST",url,true);
				xmlHttp.send(_data);
			}
		},
		createXmlHttp(){
			if(window.XMLHttpRequest){
				xmlHttp = new XMLHttpRequest(); 
				if(xmlHttp.overrideMimeType){
					xmlHttp.overrideMimeType("text/xml");
				}
			}else if(window.ActiveXobject){
				var activeName =["MSXML2.XMLHTTP","Microsoft.XMLHTTP"];
				for(var i=0; i<activeName.length; i++){
					try{xmlHttp = new ActiveXobject(activeName[i]);break;}catch(e){}
				}     
			}else{
				xmlHttp=false;
			}
			return xmlHttp;
		},
		callback_bk2(){
			if(event.lengthComputable){
				jdt = Math.ceil(event.loaded * 100 / event.total) + "%";
				if(jdt=='100%'){MK.callback_bk();}
			}
		},
		callback_bk(){
			if(xmlHttp.readyState == 4){
				if(xmlHttp.status == 200){
					var result = xmlHttp.responseText;
					if(result){
						MK.change_box(result);
					}
				}
			}
		},
		change_box(result){
			var json = eval("(" + result + ")");
			var texts='';
			var ts='';
			switch(json.type){
				case 'image':
					for(var n in json.url){
						if(json.url[n].indexOf(MK.config.uploadPath)>-1){
							texts+='<img src="'+json.url[n]+'" />';
						}else{ts+=(n+1)+':'+json.url[n]+'\n';}
					}
					break;
				case 'audio':
				case 'video':
					for(var n in json.url){
						if(json.url[n].indexOf(MK.config.uploadPath)>-1){
							var autoplay=document.getElementById('mk_autoplay').checked?' autoplay':'';
							var loop=document.getElementById('mk_loop').checked?' loop':'';
							var controls=' controls';
							texts+='<p><'+json.type+' src="'+json.url[n]+'"'+autoplay+loop+controls+'></'+json.type+'></p>';
						}else{ts+=(n+1)+':'+json.url[n]+'\n';}
					}
					texts+='<p><br/></p>';
					break;
				case 'file':
					for(var n in json.url){
						if(json.url[n].indexOf(MK.config.uploadPath)>-1){
							texts+='<p><a target="_blank" href="'+json.url[n]+'">'+MK.options.lang[json.type]+'</a></p>';
						}else{ts+=(n+1)+':'+json.url[n]+'\n';}
					}
					texts+='<p><br/></p>';
					break;
				default:break;
			}
			ts!=''?alert(MK.options.lang['uploadError']+':\n'+ts):'';
			MK.doFc(json.type,texts);
		},
	};
})(window);

