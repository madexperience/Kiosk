let cart = []; // 장바구니 아이템을 저장할 배열
let total = 0; // 총 가격을 저장할 변수

function addToCart(foodName, price) {
  // 장바구니에 해당 음식이 이미 있는지 확인
  let index = cart.findIndex(item => item.foodName === foodName);

  if (index !== -1) {
    // 이미 장바구니에 있는 경우 수량을 증가시키고 가격을 업데이트
    cart[index].quantity++;
    cart[index].subtotal = cart[index].quantity * price;
  } else {
    // 장바구니에 없는 경우 새로운 아이템을 추가
    cart.push({
      foodName: foodName,
      price: price,
      quantity: 1,
      subtotal: price
    });
  }

  updateCart();
}

// 장바구니 업데이트 함수 정의
function updateCart() {
  // 장바구니 목록 업데이트
  let cartList = $('#cart');
  cartList.empty(); // 기존 목록 지우기

  // 장바구니 아이템 추가
  cart.forEach(item => {
    let listItem = $('<li class="list-group-item"></li>');
    listItem.text(`${item.foodName} x ${item.quantity}개 = ${item.subtotal.toLocaleString()}원`);
    cartList.append(listItem);
  });

  // 총 가격 업데이트
  total = cart.reduce((acc, item) => acc + item.subtotal, 0);
  $('#total').text(`${total.toLocaleString()}원`);
}

// 각 음식 이미지를 누를 때 addToCart 함수 호출
$('.single_menu').click(function () {
  let foodName = $(this).find('.menu_content h4 a').text().trim();
  let priceText = $(this).find('.menu_content b').text().trim();
  let price = parseInt(priceText.replace(/[^0-9]/g, ''), 10); // 콤마 제거하여 숫자만 추출
  addToCart(foodName, price);
});

// 장바구니 비우기 함수 정의
function resetCart() {
  cart = [];
  total = 0;
  updateCart();
}

$('#checkoutBtn').click(function () {
  $('#paymentIcons').show();
});

function selectPayment(paymentMethod) {
  alert(`선택한 결제 방식: ${paymentMethod}`);
  $('#paymentModal').modal('hide');
}
// =================================================장바구니 애니메이션 이벤트===============================================================

let isAnimating = false; // 애니메이션 중인지 여부를 확인하는 변수

function addToCartWithAnimation(foodName, price, imageUrl) {
  if (isAnimating) {
    // 이미 애니메이션이 진행 중이면 추가 애니메이션을 막음
    return;
  }

  isAnimating = true; // 애니메이션 중임을 표시

  let foodImage = $(`<img src="${imageUrl}" alt="${foodName}" class="cart-item">`);
  $('body').append(foodImage);

  // 음식 이미지의 초기 위치 설정
  let foodImageOffset = $('.cart-container').offset();
  foodImage.css({
    top: foodImageOffset.top + 'px',
    left: foodImageOffset.left + 'px',
  });

  // 장바구니 위치로 애니메이션
  foodImage.animate({
    top: $('.cart-container').offset().top,
    left: $('.cart-container').offset().left,
  }, 500, function () {
    // 애니메이션이 완료된 후 이미지 삭제
    foodImage.remove();
    isAnimating = false; // 애니메이션이 완료되었음을 표시
  });

  // addToCart 함수 호출 (애니메이션이 완료된 후에 호출되도록 변경)
  addToCart(foodName, price);
}

//핸들러 중복제거
$('.single_menu').off('click');

// 각 음식 이미지를 누를 때 addToCartWithAnimation 함수 호출
$('.single_menu').click(function () {
  let foodName = $(this).find('.menu_content h4 a').text().trim();
  let priceText = $(this).find('.menu_content b span').text().trim();
  let price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
  let imageUrl = $(this).find('img').attr('src');
  addToCartWithAnimation(foodName, price, imageUrl);
});