// signup.js

// 생성자 : 문원주
// 생성일 : 25.06.13
// 파일명 : signup.js
// 수정자 : 
// 수정일 : 
// 설명 : SignUp.html을 보조하는 js 파일 기능 / 미구현


document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const progressSteps = document.querySelectorAll('.progress-indicator .step');
    const formSteps = document.querySelectorAll('.form-step');
    let currentStep = 1;

    // 초기 상태 설정: 첫 번째 단계만 보이기
    function showStep(stepNum) {
        formSteps.forEach(step => {
            if (parseInt(step.dataset.step) === stepNum) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        progressSteps.forEach(step => {
            if (parseInt(step.dataset.step) <= stepNum) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    // "다음" 버튼 클릭 이벤트
    document.querySelectorAll('.next-step-button').forEach(button => {
        button.addEventListener('click', () => {
            // 현재 단계의 유효성 검사 (여기에서 유효성 검사 로직 추가)
            if (validateCurrentStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            } else {
                alert('모든 필수 정보를 올바르게 입력해주세요.');
            }
        });
    });

    // "이전" 버튼 클릭 이벤트
    document.querySelectorAll('.prev-step-button').forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    // "모든 약관 동의" 체크박스
    const agreeAllCheckbox = document.getElementById('agree-all');
    const requiredCheckboxes = document.querySelectorAll('.terms-agreements input[required]');
    const optionalCheckboxes = document.querySelectorAll('.terms-agreements input:not([required])');

    if (agreeAllCheckbox) {
        agreeAllCheckbox.addEventListener('change', () => {
            requiredCheckboxes.forEach(cb => cb.checked = agreeAllCheckbox.checked);
            optionalCheckboxes.forEach(cb => cb.checked = agreeAllCheckbox.checked);
        });
    }

    // 개별 필수 약관 체크박스 변경 시 "모든 약관 동의" 상태 업데이트
    requiredCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            agreeAllCheckbox.checked = Array.from(requiredCheckboxes).every(checkbox => checkbox.checked) &&
                Array.from(optionalCheckboxes).every(checkbox => checkbox.checked);
        });
    });

    optionalCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            agreeAllCheckbox.checked = Array.from(requiredCheckboxes).every(checkbox => checkbox.checked) &&
                Array.from(optionalCheckboxes).every(checkbox => checkbox.checked);
        });
    });

    // 폼 최종 제출 이벤트 (마지막 단계의 "회원가입" 버튼)
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault(); // 기본 폼 제출 방지

            // 마지막 단계 유효성 검사 (필수 약관 동의 등)
            if (!validateCurrentStep(currentStep)) {
                alert('필수 약관에 동의해주세요.');
                return;
            }

            // TODO: 최종 회원가입 데이터 백엔드로 전송
            alert('회원가입이 완료되었습니다!');
            console.log('회원가입 데이터:', {
                username: document.getElementById('signup-username').value,
                password: document.getElementById('signup-password').value,
                email: document.getElementById('signup-email').value,
                name: document.getElementById('signup-name').value,
                birthdate: document.getElementById('signup-birthdate').value,
                gender: document.querySelector('input[name="gender"]:checked')?.value,
                phone: document.getElementById('signup-phone').value,
                agreeService: document.getElementById('agree-service').checked,
                agreePrivacy: document.getElementById('agree-privacy').checked,
                agreeMarketing: document.getElementById('agree-marketing').checked
            });
            // window.location.href = 'login.html'; // 로그인 페이지로 리다이렉트
        });
    }

    // 각 단계별 유효성 검사 함수 (필요에 따라 더 상세하게 구현)
    function validateCurrentStep(step) {
        let isValid = true;
        const currentFormStep = document.querySelector(`.form-step[data-step="${step}"]`);

        if (!currentFormStep) return false;

        // 필수 입력 필드 검사
        currentFormStep.querySelectorAll('input[required]').forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                // input.classList.add('error'); // 오류 시 스타일 추가
            } else {
                // input.classList.remove('error');
            }
        });

        // 비밀번호 확인 검사 (1단계)
        if (step === 1) {
            const password = document.getElementById('signup-password').value;
            const passwordConfirm = document.getElementById('signup-password-confirm').value;
            if (password !== passwordConfirm || password.length < 8) { // 최소 길이 검사도 추가
                isValid = false;
                // alert('비밀번호가 일치하지 않거나 유효하지 않습니다.');
            }
        }

        // 필수 약관 동의 검사 (3단계)
        if (step === 3) {
            requiredCheckboxes.forEach(cb => {
                if (!cb.checked) {
                    isValid = false;
                }
            });
        }


        // TODO: 아이디 중복 확인, 이메일 인증 등 서버 통신 필요한 유효성 검사 결과도 반영해야 함

        return isValid;
    }

    // 초기화
    showStep(currentStep);
}); s