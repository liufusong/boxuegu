<?php 



// include( 文件的路径 ) 可以将文件读取出来并放到当前位置
// include( './views/index/index.html' );

// 提供一个功能, 无论访问什么页面都是通过这个 php 文件来实现的导航
// 另一个方面, 我们需要使用 php 来复用页面结构

// 模拟一下页面的 url 的请求
// studyit.com 								-> 			/views/index/index.html
// studyit.com/index.php 					->          /views/index/index.html
// studyit.com/index.php/login      		->          /views/index/login.html
// studyit.com/index.php/repass     		->          /views/index/repass.html
// studyit.com/index.php/teacher/list 		->			/views/teacher/list.html
// studyit.com/index.php/uaser/add 			->			/views/user/add.html


// 利用 $_SERVER 可以查看 url
// var_dump($_SERVER);
// 使用 REQUEST_URL 比较简单可以拿到所有的 url 数据. 我们不使用它, 作为练习自己完成
// 用 PATH_INFO
// 只会拿到 index.php 后面的内容, 同时如果页面没有编写任何文件路径, 那么就不存在该属性

// php 中 array_key_exists 函数可以判断某一个 数组中是否含有某数据
// $pathInfoExists = array_key_exists('PATH_INFO', $_SERVER);
// if ( $pathInfoExists ) {
// 	echo "有数据: " . $_SERVER[ 'PATH_INFO' ];
// } else {
// 	echo "没有数据, 应该显示主页: /views/index/index.html";
// }

// 总结归纳一下, 无论页面有没有数据, 都可以将其划定为有数据
// 如果没有将其设置为 /
// 那么路径就可以归纳为三种情况
// 1> 只有一个 /
// 2> / 后只有一个名字
// 3> / 后有两个名字

// 改良上面的代码
$pathInfoExists = array_key_exists('PATH_INFO', $_SERVER);
if ( $pathInfoExists ) {
	$path_info = $_SERVER[ 'PATH_INFO' ];
} else {
	$path_info = '/';
}

// 开始之前应该将开始的 / 移除 substr
$path_info = substr($path_info, 1);

// 使用 类似于 split 的方法将其 分割( explode )
$path_infos = explode('/', $path_info);
// 结果有三种情况
// [ '' ]
// [ '名字' ]
// [ '名字', '名字' ]

// 判断字符串的长度使用 strlen()
if ( strlen($path_infos[ 0 ]) == 0 ) {
	// 第一种情况, 即没有输入任何路径, 默认显示的是主页
	$path = 'index';
	$filename = 'index';
} elseif ( count($path_infos) == 2 ) {
	// 输入的是两个名字
	$path = $path_infos[ 0 ];
	$filename = $path_infos[ 1 ];
} else {
	// 输入的一个名字, 显示 index 下的对应页面
	$path = 'index';
	$filename = $path_infos[ 0 ];
}

include( './views/' . $path . '/' . $filename . '.html' );

?>