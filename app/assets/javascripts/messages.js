var image_files = [];

document.addEventListener('turbolinks:load',function(){ //turbolink読み込まれたら(発火しないため)
    $('#form_show').on('click',function(){ //id form_show ｸﾘｯｸ時
    $('#content_form').toggleClass('off');     //id content_formにｸﾗｽ:onを付与,2回目はonを除去,3回目はonを付与
    if ($('#content_form').hasClass('off')){   //id content_form がｸﾗｽ:onを持っているとき
      $('#form_show').text('詳細検索');  //.text = ｾﾚｸﾀのtext変更
      $("#content_form").fadeOut(200);  // id content_formをﾌｪｰﾄﾞｱｳﾄ
    } else {
      $('#form_show').text('閉じる'); 
      $("#content_form").fadeIn(200);         //.feadIn = ｾﾚｸﾀのstyle="display:none"を消して表示 (200)は表示する㎜秒  
    }
    });

    $('#form_show').mouseover(function(){           //form_showにｶｰｿﾙが合わさった時
      $('#form_show').css('color','orange');        //ｽﾀｲﾙｼｰﾄ ｶﾗｰをorangeに変更
    }).mouseout(function(){                         //form_showからｶｰｿﾙが外れた時
      $('#form_show').css('color','');
    });

  //反映されていない
  $('#title_or_body_or_user_name_or_comments_content_cont').mouseover(function(){          
      console.log('OK');
      $('#title_or_body_or_user_name_or_comments_content_cont').css('border-color','#67c5ff');
  }).mouseout(function(){
      $('#title_or_body_or_user_name_or_comments_content_cont').css('border-color','#ffe4b5');
  });

/*
1. ﾀﾎﾞｰﾘﾝｸｽ回避(=ﾀｰﾎﾞﾘﾝｸｽがloadされた時に、下記実行)
2. class deleteの要素(ﾀｸﾞのこと以下要素=ﾀｸﾞ)を全て取得して、繰り返す(取得した要素分) 引数a = 取得した要素
3. 取得した要素がajax:success(今回は削除※remote: true で削除ﾘﾝｸを踏みdestroyｱｸｼｮﾝが成功したら)されたら以下関数実行
4. 取得した要素の親要素取得　変数名tdとしているのは、実際に取得されるのがtdのため　削除ﾘﾝｸの親要素はtdのため　divとかの場合もある
5. 取得した要素の親要素の親要素取得　今回がtr
6. tr以下の表示を none = 消す
*/
document.querySelectorAll('.delete').forEach(function(a){
    a.addEventListener('ajax:success',function(){
    let td = a.parentNode;
    let tr = td.parentNode;
    tr.style.display = 'none';
    });
  });

//ﾒｯｾｰｼﾞの文字数取得
  $('#message_body').on('keydown keyup change', function() {
    var count = $(this).val().length;
    $("#count").text(count);
    if(count > 5000) {
      $("#count").css({color: 'red', fontWeight: 'bold'});
    }else{
      $("#count").css({color: '#333', fontWeight: 'normal'});
    }
  });

//メッセージフォーム装飾
  $(document).ready(function(){
    $('.nice-textbox').blur(function() {
        if($(this).val().length === 0){
          $('.nice-label').removeClass("focus");
        }
        else { returns; }
      })
      .focus(function() {
        $('.nice-label').addClass("focus")
      });
  });

//タイトルフォーム装飾
  $(document).ready(function(){
    $('.nice-textbox_title').blur(function() {
        if($(this).val().length === 0){
          $('.nice-label_title').removeClass("focus");
        }
        else { returns; }
      })
      .focus(function() {
        $('.nice-label_title').addClass("focus")
      });
  });

//添付画像preview
$('.message_form').on('change', 'input[type="file"]',function(){
  if(this.files != null){ //ﾌｧｲﾙが空でないとき＝ﾌｧｲﾙが添付されているとき/ this.files = 添付画像の情報
    $.each(this.files, function(i,file){  // 繰り返す this_filesをfileに納めきるまで
      var reader = new FileReader() //FileReader=ﾌｧｲﾙのﾘｰﾀﾞｰ=file値が読める
      reader.onload = (function(file){
        return function(e){
          $('.image_preview_container').append('<div class="image_preview">' +
          '<li class= "image_file">' + file.name + '/' + file.size + '/' + file.type + '</li>' +
          '<button class="btn btn_edit">編集</button><button class="btn btn_delete">削除</button>' +
          '<img src=' + e.target.result + ' width="50" height= "50" ></div>') //ulに情報追加
        }
      })(file);
      reader.readAsDataURL(file) //file読み込む
      image_files.push(file)     //image_fileに添付画像情報を格納 .push = 追加
    })
    console.log(image_files)
  }
})

//削除ﾎﾞﾀﾝｱｸｼｮﾝ
$('.image_preview_container').on('click', '.btn_delete', function(){
  var index = $('button.btn_delete').index(this) //押された,aﾀｸﾞのbtn_deleteが何番目(index)か? 
  image_files.splice(index, 1) //添付画像の情報を格納したimage_filesのindex番目から1個削除
  $(this).parent().remove() //押されたbtn_deleteの親要素削除
})


//配列 image_filesをajaxでｺﾝﾄﾛｰﾗに送信する
  $('.message_form').on('submit',function(e){
    // 通常のsubmitイベントを止める
    e.preventDefault(); //ｲﾍﾞﾝﾄなにもなしの状態にｓｙる

    // images以外のform情報をformDataに追加
    var formData = new FormData($(this).get(0));
    console.log(formData)

    // imagesがない場合は0の文字列を入れのちのcontorollerで条件分岐させる
    if (image_files.length == 0) {
      formData.append("new_images[images][]", 0)
    // imagesがある場合はformDataに追加する
    } else {
      image_files.forEach(function(file){
        formData.append("new_images[images][]", file)
      });
    }
    //ajaxでｺﾝﾄﾛｰﾗにﾃﾞｰﾀ送信
    $.ajax({
      url:         '/messages',
      type:        "POST",
      data:        formData,
      contentType: false,
      processData: false,
    })

    image_files = []; //ここでリセットしないと永遠imageが追加されていく
  })
})