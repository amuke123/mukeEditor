//console.log(document.currentScript.src);
(function (window){
	window.MK={
		config:{
			width:'100%',
			height:"280px",
			language:"zh-CN",
			style:"style",
			autoHeight:true,
			navs:['html','|','bold','italic','strike','underline','fontSize','fontFamily','paragraph','color','backColor','|',
			'left','center','right','full','indent','outdent','|','link','unlink','textBlock','code','selectAll','removeStyle','removeHtml','|',
			'image','audio','video','subscript','superscript','hr','orderedList','unorderedList','|','undo','redo','|','about'],
		},
		options:{
			version:"1.0.0",/**版本**/
			lang:{},/**语言包数据**/
			id:'',/**文本框id**/
			Path:'',/**本文件地址**/
			langPath:'',/**语言包文件地址**/
			preKey:false,/**pre模式开启**/
			htmlKey:false,/**html模式开启**/
			elemBox:'',/**html盒子**/
			navBox:'',/**nav盒子**/
			textBox:'',/**文本框盒子**/
			font:{songti:"SimSun",kaiti:"KaiTi",heiti:"SimHei",yahei:"Microsoft YaHei",andalemono:"andale mono",arial:"arial",arialblack:"arial black",comicsansms:"comic sans ms",impact:"impact",timesnewroman:"times new roman"},
			code:{js:"JavaScript",html:"HTML",css:"CSS",php:"PHP",pl:"Perl",py:"Python",rb:"Ruby",java:"Java",vb:"ASP/VB",cpp:"C/C++",cs:"C#",xml:"XML",bsh:"Shell",other:"Other"},/**字体**/
			color:{
				base: ["c00000", "ff0000", "ffc000", "ffff00", "92d050", "00b050", "00b0f0", "0070c0", "002060", "7030a0"],
				topic: [["ffffff", "000000", "eeece1", "1f497d", "4f81bd", "c0504d", "9bbb59", "8064a2", "4bacc6", "f79646"], ["f2f2f2", "7f7f7f", "ddd9c3", "c6d9f0", "dbe5f1", "f2dcdb", "ebf1dd", "e5e0ec", "dbeef3", "fdeada"], ["d8d8d8", "595959", "c4bd97", "8db3e2", "b8cce4", "e5b9b7", "d7e3bc", "ccc1d9", "b7dde8", "fbd5b5"], ["bfbfbf", "3f3f3f", "938953", "548dd4", "95b3d7", "d99694", "c3d69b", "b2a2c7", "92cddc", "fac08f"], ["a5a5a5", "262626", "494429", "17365d", "366092", "953734", "76923c", "5f497a", "31859b", "e36c09"], ["7f7f7f", "0c0c0c", "1d1b10", "0f243e", "244061", "632423", "4f6128", "3f3151", "205867", "974806"]],/**颜色**/
			},
			format:["li","pre","h1","h2","h3","h4","h5","h6"],
			funcs:[],/**操作集合**/
		},
		getEditor(box,i){/**入口**/
			this.loading(box,i);
			return MK;
		},
		loading(box,i){/**加载**/
			this.setDir(box);
			this.loadCss(this.config.style);
			this.loadCss('icono');
			this.loadScript(this.options.langPath);
		},
		loadCss(el){/**css加载**/
			var css=document.createElement('link');
			css.type="text/css",
			css.rel="stylesheet",
			css.href=this.options.Path+'themes/css/'+el+'.css';
			var h=document.getElementsByTagName("head");
			h.length ? h[0].appendChild(css):document.documentElement.appendChild(css);
		},
		loadScript(el){/**script加载**/
			var script=document.createElement('script');
			script.type="text/javascript";
			script.onload=function(){MK.options.lang=langs,MK.disPlay()};
			script.src=el;
			var h=document.getElementsByTagName("head");
			h.length?h[0].appendChild(script):document.documentElement.appendChild(script);
		},
		setDir(box){/**获取当前地址和语言包地址**/
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
			this.options.elemBox.onclick=this.editorClick,
			this.options.elemBox.onkeydown=function(e){
				var i=e||window.event;
				if(13==(i.keyCode||i.which||i.charCode)){
					MK.setFormat()||i.shiftKey?'':MK.layout("formatBlock","<p>",true);
				}
			};
			elem.appendChild(nav);
			elem.appendChild(editor);
			elem.appendChild(M);
		},
		layout(action,tag,key=false){
			1==(key=key||false)?this.options.elemBox.focus():this.resume();
			tag=tag||null;
			document.execCommand(action,false,tag);
		},
		resume(){
			this.options.elemBox.focus();
			this.selarea(true);
		},
		selarea(key=false){
			window.getSelection?(dom=window.getSelection(),key?(dom.removeAllRanges(),dom.addRange(this.options.select)):this.options.select=dom.getRangeAt(0)):key?(document.body.createTextRange().select(),document.selection.empty(),document.selection.addRange(this.options.select)):this.options.select=document.selection.createRange();
			key&&(this.options.select=null);
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
					texts+='<span class="mk-'+this.config.navs[i]+'" title="'+this.options.lang[this.config.navs[i]]+'"><i class="icono-'+this.config.navs[i]+'"></i></span>';
				}
			}
			return texts;
		},
		processInnderDiv(el){/**点击响应**/
			myClass=el.getAttribute("class").split('-')[1];
			this.options.funcs.push('MK.fc_'+myClass+'("'+myClass+'")');
			var funcsLine = this.options.funcs.length-1;
			eval(this.options.funcs[funcsLine]);
		},
		fc_bold(id){/**加粗**/
			this.layout('bold');
			//console.log(this.options.lang[id]);
		},
		fc_html(id){/**html模式**/
			if(this.options.htmlKey){
				this.options.htmlKey=this.setHtml(this.getText())
			}else{
				this.options.htmlKey=this.setText(this.getHtml());
			}
		},
		getText(){/**获取文本内容**/
			return this.options.textBox.value;
		},
		getHtml(){/**获取html文本内容**/
			return this.options.elemBox.innerHTML;
		},
		setText(el){/**设置文本内容**/
			el=this.setBr(el);
			this.options.textBox.style.display="block";
			this.options.elemBox.style.display='none';
			this.options.textBox.value=el;
			return true;
		},
		setHtml(el){/**设置html文本内容**/
			this.options.textBox.style.display="none";
			this.options.elemBox.style.display="block";
			this.options.elemBox.innerHTML=el;
			return false;
		},
		setBr(el){
			var pieces=this.options.format;
			pieces.push('p');
			pieces.push('ol');
			pieces.push('ul');
			pieces.push('div');
			for(n in pieces){
				el=el.replace("/<\/"+pieces[n]+"></g",'</'+pieces[n]+'>\n<');
			}
			return el;
		},
		editorClick(){
			if(document.getElementById("mk_div")){this.deldiv();}
			if(this.options.preKey){this.options.preKey=false;}
			temArr=Array("b","i","strike","u","em","strong");
			newArr=Array();
			dataArr=["bold","italic","strike","underline"];
			for(var onNode=this.getNode(),onName=this.getNodeName(onNode);temArr.indexOf(onName)>-1;){
				if(onName=="strong"||onName=="b"){onName="bold";}
				if(onName=="em"||onName=="i"){onName="italic";}
				if(onName=="u"){onName="underline";}
				if(onName=="strike"){onName="strike";}
				newArr.push(onName);
				onNode=this.getNextNode(onNode);
				onName=this.getNodeName(onNode);
			}
			for(var a in dataArr){e=document.getElementById(HE.getId(dataArr[a]));HE.hasClass(e,"mk_item")&& HE.removeClass(e,"mk_item");}
			if(newArr.length >0)for(var a in newArr){e=document.getElementById(HE.getId(newArr[a]));HE.hasClass(e, "HandyEditor_menu_item_valid") || HE.addClass(e, "HandyEditor_menu_item_valid");}
			this.selarea();
		},
		deldiv(){
			this.options.navBox.removeChild(document.getElementById("mk_div"))
		},
		getId(e){
			return "mk_"+e;
		},
	};
})(window);

