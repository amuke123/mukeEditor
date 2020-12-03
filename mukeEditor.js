//console.log(document.currentScript.src);
(function (window){
	window.MK={
		config:{
			width:'100%',
			height:"280px",
			language:"zh-CN",
			style:"style",
			autoHeight:true,
			navs:['html','|','bold','italic','delline','underline','fontSize','fontFamily','paragraph','color','backColor','|',
			'left','center','right','full','indent','outdent','|','link','unlink','textBlock','code','selectAll','removeStyle','removeHtml','|',
			'image','audio','video','subscript','superscript','hr','orderedList','unorderedList','|','undo','redo','|','about'],
		},
		options:{
			version:"1.6.3",
			lang:{},
			id:'',
			Path:'',
			langPath:'',
			navBox:'',
			textBox:'',
			font:{songti:"SimSun",kaiti:"KaiTi",heiti:"SimHei",yahei:"Microsoft YaHei",andalemono:"andale mono",arial:"arial",arialblack:"arial black",comicsansms:"comic sans ms",impact:"impact",timesnewroman:"times new roman"},
			code:{js:"JavaScript",html:"HTML",css:"CSS",php:"PHP",pl:"Perl",py:"Python",rb:"Ruby",java:"Java",vb:"ASP/VB",cpp:"C/C++",cs:"C#",xml:"XML",bsh:"Shell",other:"Other"},
			color:{
				base: ["c00000", "ff0000", "ffc000", "ffff00", "92d050", "00b050", "00b0f0", "0070c0", "002060", "7030a0"],
				topic: [["ffffff", "000000", "eeece1", "1f497d", "4f81bd", "c0504d", "9bbb59", "8064a2", "4bacc6", "f79646"], ["f2f2f2", "7f7f7f", "ddd9c3", "c6d9f0", "dbe5f1", "f2dcdb", "ebf1dd", "e5e0ec", "dbeef3", "fdeada"], ["d8d8d8", "595959", "c4bd97", "8db3e2", "b8cce4", "e5b9b7", "d7e3bc", "ccc1d9", "b7dde8", "fbd5b5"], ["bfbfbf", "3f3f3f", "938953", "548dd4", "95b3d7", "d99694", "c3d69b", "b2a2c7", "92cddc", "fac08f"], ["a5a5a5", "262626", "494429", "17365d", "366092", "953734", "76923c", "5f497a", "31859b", "e36c09"], ["7f7f7f", "0c0c0c", "1d1b10", "0f243e", "244061", "632423", "4f6128", "3f3151", "205867", "974806"]],
			},
		},
		getEditor(box,i){
			this.loading(box,i);
			return this;
		},
		loading(box,i){
			this.setDir(box);
			this.loadCss(this.config.style);
			/**void 0!==i&&this.extend(this.config,i);**/
			this.loadCss('icono');
			this.loadScript(this.options.langPath);
		},
		loadCss(el){
			var css=document.createElement('link');
			css.type="text/css",
			css.rel="stylesheet",
			css.href=this.options.Path+'themes/css/'+el+'.css';
			var h=document.getElementsByTagName("head");
			h.length ? h[0].appendChild(css):document.documentElement.appendChild(css);
		},
		loadScript(el){
			var script=document.createElement('script');
			script.type="text/javascript";
			script.onload=function(){MK.options.lang=langs,MK.disPlay()};
			script.src=el;
			var h=document.getElementsByTagName("head");
			h.length?h[0].appendChild(script):document.documentElement.appendChild(script);
		},
		setDir(box){
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
		disPlay(){
			M=document.getElementById(this.options.id);
			M.className=M.className==''?'mk-editor':M.className+' mk-editor';
			this.config.autoHeight?(M.style.minHeight=this.config.height,M.style.height="auto"):(M.style.height=this.config.height,M.style.overflow="auto");
			var elem = document.createElement('div');
			var nav = document.createElement('div');
			elem.className='mk-box';
			elem.style.width=this.config.width;
			nav.className='mk-nav';
			nav.id='mk-nav';
			nav.innerHTML=this.getNavList();
			M.parentNode.replaceChild(elem,M);
			elem.appendChild(nav);
			elem.appendChild(M);
			nav.addEventListener("click",function(event){MK.processInnderDiv(event.target);},false);
			this.options.navBox=nav;
			this.options.textBox=M;
		},
		getNavList(){
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
		processInnderDiv(el){
			myClass=el.getAttribute("class").split('-')[1];
			MK.eval('fc_'+myClass+'(myClass)');
			//console.log(myClass);
		},
		extend(e,i){
			for(var n in i){e[n]=i[n];}
			return e;
		},
		fc_bold(id){
			console.log(this.options.lang[id]);
		},
	};
})(window);

