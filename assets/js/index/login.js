define( [ 'jquery', 'cookie' ], function ( $ ) {


 $( '#formId' ).on( 'submit', function () {

            // 1, 收集数据
    var formData = $( this ).serialize();

    // 2, 发送 ajax 请求
    $.ajax({
        url: '/api/login',
        type: "post",
        data: formData,
        success: function ( info ) {
            console.log( info );
            if ( info.code == 200 ) {
                alert( '登录成功' );

                // 保存数据到 cookie 中
                $.cookie( 'userInfo', JSON.stringify( info.result ), { path: '/' } );


                location.pathname = '/';
            }
        }
    });


    return false;
});


});