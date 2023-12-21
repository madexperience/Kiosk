function darkModeEV() {
    let element = document.body;
  
    // data-bs-theme 속성 변경
    element.dataset.bsTheme =
      element.dataset.bsTheme == "light" ? "dark" : "light";
  
    // 텍스트 컬러 변경 메서드
    let textColor = element.dataset.bsTheme == "light" ? "hsl(0, 0%, 10%)" : "hsl(0, 0%, 100%)";
    document.body.style.color = textColor;
  }