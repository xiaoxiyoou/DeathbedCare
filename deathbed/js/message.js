  //点击弹出评论框

  $(".input").click(function() {

          $(".warp").css("display", "block");

      })
      //点击隐藏评论框

  $(".textarea_btn_cancel  ").click(function() {

      $(".warp").css("display", "none");

  })


  //选择五角星
  $(".star").click(function() {
          $(this).attr("src", "img/loc/star2.png") //当前点击的元素
          $(this).siblings().attr("src", "img/loc/star2.png"); //当前点击元素的兄弟元素
          $(this).nextAll().attr("src", "img/loc/star01.png"); //之后的兄弟元素空心
          starNum = $(".star").index($(this));
          console.log('index', starNum);
          switch (starNum) {
              case 0:
                  $('.star_text').text("非常不满意")
                  break;
              case 1:
                  $('.star_text').text("不满意")
                  break;
              case 2:
                  $('.star_text').text("一般")
                  break;
              case 3:
                  $('.star_text').text("满意")
                  break;
              case 4:
                  $('.star_text').text("非常满意")
                  break;
          }



      })
      //点击提交评论
  $(".textarea_btn_ensure").click(function() {
          var contentMsg = $(".textarea").val();
          if (contentMsg == "") {
              layer.open({
                  content: '请输入评论内容',
                  skin: 'msg',
                  time: 2
              });
              return false;
          }
          var starLevel = starNum + 1;
          var id = articleId[index];
          console.log("articleId", articleId);
          console.log("index", index);
          console.log("id", id);
          console.log("starLevel", starLevel);
          console.log($(".textarea").val());
          $(".textarea").val("");
          $(".warp").css("display", "none");
          subComment(starLevel, contentMsg, id);


      })
      //请求提交评论接口   
  function subComment(starLevel, contentMsg, id) {
      var data = {
          starLevel,
          contentMsg,
          articleId: id,
          userName,
          userHeadImg,
          userId,
      }
      console.log("data", data)
      console.log("userHeadImg", userHeadImg)
      httpRequest("/DeathbedConcernApi/InfosRefAdd.ashx", "get", data).then(function(res) {
          console.log("提交评论", res);
          layer.open({
              content: '评论成功',
              skin: 'msg',
              time: 2
          });
          conment_request(id);

      })
  }
  //请求评论数据
  function conment_request(articleId) {
      $(".conment_group").html("");

      var data = {
          articleId,
          pageIndex: 1,
          pageSize: 1000,
      }
      console.log("messagearticleId", articleId)

      httpRequest("DeathbedConcernApi/InfosRefList.ashx", "get", data).then(function(res) {
          console.log("评论请求", res);
          var html = '';
          var data = res.Data;
          if (data !== null) {
              for (i = 0; i < data.length; i++) {
                  var starlevel = data[i].starlevel;
                  var gray = 5 - starlevel;
                  html += '<div class="conment_item">';
                  html += '<div class="conment_top c-row a-c">';
                  html += '<img class="conment_head" src="' + data[i].RefHeaderImg + '" alt="">';
                  html += '<div class="conment_aside_con c-col">';
                  html += '<div class="conment_aside c-row j-b">';
                  html += '<div class="conment_name">' + data[i].RefNickName + '</div>';
                  html += '<div class=""conment_star_con>';
                  for (j = 0; j < starlevel; j++) {
                      html += '<img class="conment_star" src="img/loc/star2.png" alt="">';
                  }
                  for (k = 0; k < gray; k++) {
                      html += '<img class="conment_star" src="img/loc/star01.png" alt="">';
                  }
                  html += '</div>';
                  html += '</div>';
                  html += '<div class="conment_data">' + data[i].RefTime + '</div>';
                  html += '</div>';
                  html += ' </div>';
                  html += ' <div class="conment_content">' + data[i].RefContent + '';
                  html += ' </div>';
                  html += ' </div>';
              }
              $(".conment_group").append(html);
              $(".no_conment").css("display", "none");
              $(".conment_num").text('(' + data.length + ')');

          } else {
              $(".no_conment").css("display", "block");
              $(".conment_num").text('(' + 0 + ')');


          }
      })
  }
  //判断是否添加信息和收藏
  function regSign(index) {
      var data = {
          userId,
          cateid: 13
      }

      httpRequest("DeathbedConcernApi/DeathbedListTotal.ashx", "get", data).then(function(res) {
          console.log("是否收藏和登记", res);
          ishistory = res.Data[index].ishistory;
          reg = res.Data[index].isreg;
          console.log("ishistory", ishistory);
          console.log("reg", reg);
          if (ishistory === 1) {
              $(".colloction_img").attr("src", "./img/loc/collection-hover.png");
          } else {
              $(".colloction_img").attr("src", "./img/loc/collection.png");

          }



      })
  }
  //点击收藏和取消收藏
  $(".colloction_img").click(function() {
          var id = articleId[index];
          console.log("id", id)
          console.log("articleId", articleId)
          console.log("ishistory", ishistory)
          if (ishistory === 0) {
              colloction(id);
              ishistory = 1
              $(".colloction_img").attr("src", "./img/loc/collection-hover.png");
          } else {
              cancelColloction(id);
              ishistory = 0
              $(".colloction_img").attr("src", "./img/loc/collection.png");
          }
      })
      //收藏请求
  function colloction(id) {
      var data = {
          userId,
          articleId: id
      }

      httpRequest("/DeathbedConcernApi/InfosHistoryAdd.ashx", "get", data).then(function(res) {
          console.log("收藏成功", res);
          layer.open({
              content: '收藏成功',
              skin: 'msg',
              time: 2
          });



      })
  }
  // 取消收藏
  function cancelColloction(id) {
      var data = {
          userId,
          articleId: id
      }

      httpRequest("DeathbedConcernApi/InfosHistoryRemove.ashx", "get", data).then(function(res) {
          console.log("取消收藏", res);
          layer.open({
              content: '取消收藏',
              skin: 'msg',
              time: 2
          });



      })
  }