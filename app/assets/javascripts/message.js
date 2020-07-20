$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Message">
          <div class="Message__info">
            <div class="Message__info__Talker">
              ${message.user_name}
            </div>
            <div class="Message__info__Date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message__text">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="Message">
        <div class="Message__info">
          <div class="Message__info__Talker">
            ${message.user_name}
          </div>
          <div class="Message__info__Date">
            ${message.created_at}
          </div>
        </div>
        <div class="Message__text">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $(".Form").on("submit", function(e){
    e.preventDefault()
    let formData = new FormData(this);
    
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Messages').append(html); 
      $('.Messages').animate({ scrollTop: $('.Messages')[0].scrollHeight});     
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });
});
