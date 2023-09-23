alert('안녕?');
prompt('너의 이름은?', '뭐야!!');
let userName = prompt('너의 옆사람 이름은?');
let isUserNameCorrect = confirm('너의 옆사람 이름이 ' + userName + '입니까?');
if (isUserNameCorrect == true) {
  document.getElementById('user-name-goes-here').textContent =
    '내 옆사람의 이름은 ' + userName + '입니다.';
}
