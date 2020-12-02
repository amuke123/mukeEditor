//console.log(document.currentScript.src);
(function (window){
	window.MK={
		//lang:{},
		langstr:'',
		language:'zh-CN',
		style:'style',
		Path:'',
		navs:[
			'html','|','bold','italic','delline','underline','fontSize','fontFamily','paragraph','color','backColor','|',
			'left','center','right','full','indent','outdent','|','link','unlink','textBlock','code','selectAll','removeStyle','removeHtml','|',
			'image','audio','video','subscript','superscript','hr','orderedList','unorderedList','|','undo','redo','|','about',
		],
		getEditor(box){
			K=MK.Loading(box);
			//console.table(K);
			return K;
		},
		LoadCss(el){
			var css=document.createElement('link');
			css.type="text/css",
			css.rel="stylesheet",
			css.href=MK.Path+'themes/css/'+el+'.css';
			var h=document.getElementsByTagName("head");
			h.length ? h[0].appendChild(css):document.documentElement.appendChild(css);
			
		},
		LoadScript(el){
			var script=document.createElement('script');
			script.type="text/javascript",
			script.src=MK.Path+'lang/'+el+'.js';
			var h=document.getElementsByTagName("head");
			h.length?h[0].appendChild(script):document.documentElement.appendChild(script);
		},
		SetDir(){
			var els=document.getElementsByTagName('script'),src;
			for(var i=0,len=els.length;i<len;i++){
				src=els[i].src||'';
				if(/mukeEditor[\w\-\.]*\.js/.test(src)){
					MK.Path=src.substring(0,src.lastIndexOf('/')+1);
				}
			}
		},
		AddFunc(data){MK.lang=data;},
		Loading(box){
			MK.SetDir();
			MK.LoadCss(MK.style);
			MK.LoadCss('icono');
			MK.LoadScript(MK.language);
			MK.DisPlay(box);
			return MK;
		},
		getNavList(){
			var texts='';
			for(i=0,len=MK.navs.length;i<len;i++){
				if(MK.navs[i]=='|'){
					texts+='<b>|</b>';
				}else{
					texts+='<span class="mk-'+MK.navs[i]+'" title="'+MK.navs[i]+'"><i class="icono-'+MK.navs[i]+'"></i></span>';
				}
			}
			return texts;
		},
		DisPlay(box){
			M=document.getElementById(box);
			M.className=M.className==''?'mk-editor':M.className+' mk-editor';
			var elem = document.createElement('div');
			var nav = document.createElement('div');
			elem.className='mk-box';
			nav.className='mk-nav';
			nav.innerHTML=MK.getNavList();
			M.parentNode.replaceChild(elem,M);
			elem.appendChild(nav);
			elem.appendChild(M);
		},
	};
})(window);

