
// 생성자 : 문원주
// 생성일 : 25.06.13
// 파일명 : login.js
// 수정자 : 
// 수정일 : 
// 설명 : LoginScreen.html을 보조하는 js 파일 기능 미구현

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const loginButton = document.querySelector('.login-button');

    // 로그인 폼 제출 이벤트
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // 폼 기본 제출 방지

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // TODO: 여기에 백엔드 API 호출 로직 추가 (fetch API 사용)
            // 예시:
            // const response = await fetch('YOUR_BACKEND_LOGIN_API_ENDPOINT', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ userId: username, userPassword: password })
            // });
            // const data = await response.json();
            // if (response.ok) { /* 성공 처리 */ } else { /* 실패 처리 */ }

            // 현재는 개발 단계이므로 콘솔에 출력하고 알림만 띄움
            console.log('로그인 시도 - 아이디:', username, '비밀번호:', password);
            alert(`로그인 시도: ${username}`);
        });
    }

    // 로그인 버튼 물결 애니메이션 이벤트
    if (loginButton) {
        loginButton.addEventListener('click', function (e) {
            const button = e.currentTarget;
            const ripple = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            // 클릭 위치를 기준으로 물결 요소의 위치 계산
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${e.clientX - (button.getBoundingClientRect().left + radius)}px`;
            ripple.style.top = `${e.clientY - (button.getBoundingClientRect().top + radius)}px`;

            // 물결 클래스 추가
            ripple.classList.add('ripple-effect');

            // 기존 물결 효과 제거 (연속 클릭 시 애니메이션 중첩 방지)
            const oldRipple = button.querySelector('.ripple-effect');
            if (oldRipple) {
                oldRipple.remove();
            }

            // 버튼에 물결 요소 추가
            button.appendChild(ripple);
        });
    }
});