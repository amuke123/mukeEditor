<?php
if(isset($_POST['type'])){
	$data=array();
	$type=$_POST['type'];
	$myType=array();
	$myType['image']=json_decode($_POST['imageType']);
	$myType['audio']=json_decode($_POST['audioType']);
	$myType['video']=json_decode($_POST['videoType']);
	$myType['file']=json_decode($_POST['fileType']);
	$host=$_POST['host'];
	$data['type']=$type;
	$path=$_POST['path'];
	$files=getFileList($_FILES);
	if(!empty($files)){
		foreach($files as $key => $val){
			$data['url'][$key]=upload($val,$path,$type,$host,$myType);
		}
	}
	$data['txt']='ok';
	echo json_encode($data);
}

function upload($file,$path,$type,$host,$myType){
	$max_size=10*1024*1024;
	$ext_arr=$myType[$type];
	$save_path = $_SERVER['DOCUMENT_ROOT'].$path;
	$save_url = $host.$path.'/';
	$file_name = $file['name'];//原文件名
	$tmp_name = $file['tmp_name'];//服务器上临时文件名
	$file_size = $file['size'];//文件大小
	if(!$file_name){return $file_name."请选择文件。";}//检查文件名
	if(@is_dir($save_path) === false){return $file_name."上传目录不存在。";}//检查目录
	if(@is_writable($save_path) === false){return $file_name."上传目录没有写权限。";}//检查目录写权限
	if(@is_uploaded_file($tmp_name) === false){return $file_name."上传文件已存在。";}//检查是否已上传
	if($file_size > $max_size){return $file_name."上传文件大小超过限制。";}//检查文件大小
	//获得文件扩展名
	$temp_arr = explode(".", $file_name);
	$file_ext = array_pop($temp_arr);
	$file_ext = trim($file_ext);
	$file_ext = strtolower($file_ext);
	//检查扩展名
	if(in_array($file_ext,$ext_arr) === false){return $file_name."上传文件类型不被允许。";}
	//创建文件夹
	$ymd = date("Ymd");
	$save_path .= "/". $ymd . "/";
	$save_url .= $ymd . "/";
	if(!file_exists($save_path)){mkdir($save_path);}
	$new_path=$save_path;
	//新文件名
	$new_file_name = time().rand(10000,99999).'.'.$file_ext;
	//移动文件
	$file_path = $save_path . $new_file_name;
	if(move_uploaded_file($tmp_name, $file_path) === false){return $file_name."上传文件失败。";}
	@chmod($file_path, 0644);
	return $save_url.$new_file_name;
}

function getFileList($filedata){
	$files=array();
	if(count($filedata['file']['name'])>1){
		$num=count($filedata['file']['name']);
		for($i=0;$i<$num;$i++){
			$files[$i]['name']=$filedata['file']['name'][$i];
			$files[$i]['type']=$filedata['file']['type'][$i];
			$files[$i]['tmp_name']=$filedata['file']['tmp_name'][$i];
			$files[$i]['error']=$filedata['file']['error'][$i];
			$files[$i]['size']=$filedata['file']['size'][$i];
		}
	}else{
		if(!empty($filedata['file']['name'][0])){
			$files[0]['name']=$filedata['file']['name'][0];
			$files[0]['type']=$filedata['file']['type'][0];
			$files[0]['tmp_name']=$filedata['file']['tmp_name'][0];
			$files[0]['error']=$filedata['file']['error'][0];
			$files[0]['size']=$filedata['file']['size'][0];
		}
	}
	return $files;
}

?>