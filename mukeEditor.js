//console.log(document.currentScript.src);
(function (window){
	window.MK={
		M:'',
		langs:{},
		language:'zh-CN',
		style:'style',
		Path:'',
		getEditor(box){
			MK.M = document.getElementById(box);
			MK.setDir();
			MK.loadCss(MK.style);
			MK.loadScript(MK.language);
			//MK.langs=new lang();
			console.log(lang.name);
			return MK;
		},
		loadCss(el){
			var css=document.createElement('link');
			css.type="text/css",
			css.rel="stylesheet",
			css.href=MK.Path+'themes/css/'+el+'.css';
			var h=document.getElementsByTagName("head");
			h.length ? h[0].appendChild(css):document.documentElement.appendChild(css);
		},
		loadScript(el){
			var script=document.createElement('script');
			script.type="text/javascript",
			script.src=MK.Path+'lang/'+el+'.js';
			var h=document.getElementsByTagName("head");
			h.length ? h[0].appendChild(script):document.documentElement.appendChild(script);
		},
		setDir(){var mydir=document.currentScript.src;MK.Path=mydir.substring(8,mydir.lastIndexOf("\/")+1);},
	};
	
})(window);

