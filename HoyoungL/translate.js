function translateText() {
    const targetLang = $('#language-select').val();
  
    // 데이터 속성에서 번역된 텍스트를 가져온다
    $('#our_menu *').each(function () {
      const translatedText = $(this).data(targetLang);
      $(this).text(translatedText);
    });
  
    $('#translationModal').modal('hide');
  }
  
  function resetText() {
    // 번역된 텍스트를 다시 한글로 바꾸는 리셋 메서드
    $('#our_menu *').each(function () {
      const originalText = $(this).data('ko');
      $(this).text(originalText);
    });
  
    $('#translationModal').modal('hide');
  }