
// add.js 文件, 也是一个模块, 用于处理用户的添加与修改
define( [ 
	'jquery',
	'template',
	'form',
	'zhcn',
	'validate'
], function ( $, template ) {


// 用于截取 tc_id
var rtcId = /tc_id=(\d+)/;


// 由于这个页面是 添加与 修改共享的页面, 因此需要考虑判断进来的时候是什么操作
// location.search.charAt( 0 ) == '?'
var search = location.search;

if ( search.length > 0 ) {
	// alert( '编辑界面' );
	modifyTeacher();
} else {
	// alert( '新增界面' );
	addTeacher();
}


// 新增讲师
function addTeacher() {
	var html = template( 'addTeacherTpl', {
		tc_way: '讲师添加',
		tc_btn_value: '添 加'
	} );
	$( '#addTeacher' ).html( html );


	$( '#addTeacherForm' ).validate({
		description: {
			required: {
				required: '请填写完整信息'
			}
		}
	});


	// 绑定事件
	$( '#addTeacher' ).on( 'submit', '#addTeacherForm', function () {

		// // alert( '新增代码' );
		// // 开始准备提交
		// var formData = $( this ).serialize();

		// // console.log( formData );

		// // 开始进行提交
		// $.ajax({
		// 	url: '/api/teacher/add',
		// 	type: 'post',
		// 	data: formData,
		// 	success: function ( info ) {
		// 		if ( info.code == 200 ) {
		// 			// 添加成功
		// 			alert( '添加成功' );
		// 			location.pathname = '/teacher/list';
		// 		}
		// 	}
		// })


		// 下面是使用 jquery-form 插件后的代码
		$( this ).ajaxSubmit({
			url: '/api/teacher/add',
			type: 'post',
			success: function ( info ) {
				if ( info.code == 200 ) {
					// 添加成功
					alert( '添加成功' );
					location.pathname = '/teacher/list';
				}
			}
		});


		return false;
	} );
}

// 修改讲师
function modifyTeacher() {
	// 1, 利用 id 先将讲师的信息查出来
	var tc_id = rtcId.exec( search )[ 1 ];
	// ?tc_id=xxx
	// search.split( '=' )[ 1 ]
	// 查询 用户数据

	$.ajax({
		url: '/api/teacher/view',
		type: 'post',
		data: {
			tc_id: tc_id
		},
		success: function ( info ) {
			if ( info.code == 200 ) {
				console.log( info.result );
				info.result.tc_way = '讲师编辑';
				info.result.tc_btn_value = '编 辑';

				// 渲染页面
				$( '#addTeacher' ).html( template( 'addTeacherTpl', info.result ) );

					$( '#addTeacherForm' ).validate({
						description: {
							required: {
								required: '请填写完整信息'
							}
						}
					});
				

				// 下面编写修改的代码
				// 绑定事件
				$( '#addTeacher' ).on( 'submit', '#addTeacherForm', function () {

					// var formData = $( this ).serialize();

					// $.ajax({
					// 	url: '/api/teacher/update',
					// 	type: 'post',
					// 	data: formData,
					// 	success: function ( info ) {
					// 		if ( info.code == 200 ) {
					// 			// console.log( info );
					// 			alert( '修改成功' );
					// 			location.pathname = '/teacher/list';
					// 		}
					// 	}

					// });


					$( this ).ajaxSubmit({
						url: '/api/teacher/update',
						type: 'post',
						success: function ( info ) {
							if ( info.code == 200 ) {
								// console.log( info );
								alert( '修改成功' );
								location.pathname = '/teacher/list';
							}
						}

					});



					return  false;
				} )

			}
		}
	});

}


});