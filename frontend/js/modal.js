// 생성자 : 문원주
// 생성일 : 25.06.13
// 파일명 : modal.js
// 수정자 : 
// 수정일 : 
// 설명 : 모달창을 띄운 2라벨에 대한 js 파일 기능 / 미구현

document.addEventListener('DOMContentLoaded', () => {
    const findIdLink = document.getElementById('find-id-link');
    const findPwLink = document.getElementById('find-pw-link');

    const findIdModal = document.getElementById('find-id-modal');
    const findPwModal = document.getElementById('find-pw-modal');
    const resultModal = document.getElementById('result-modal'); // 아이디 찾기 결과 모달

    const closeButtons = document.querySelectorAll('.modal-close-button');
    const confirmButton = resultModal.querySelector('.modal-confirm-button');

    // 모달 열기 함수
    function openModal(modalElement) {
        modalElement.style.display = 'flex'; // Flexbox로 중앙 정렬
    }

    // 모달 닫기 함수
    function closeModal(modalElement) {
        modalElement.style.display = 'none';
        // 모달 폼 초기화 (선택 사항)
        const form = modalElement.querySelector('form');
        if (form) {
            form.reset();
        }
    }

    // 아이디 찾기 링크 클릭 시
    if (findIdLink) {
        findIdLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(findIdModal);
        });
    }

    // 비밀번호 찾기 링크 클릭 시
    if (findPwLink) {
        findPwLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(findPwModal);
        });
    }

    // 모든 닫기 버튼에 이벤트 리스너 추가
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 버튼의 부모인 modal-content의 부모가 modal-overlay 이므로, modal-overlay를 닫음
            closeModal(e.target.closest('.modal-overlay'));
        });
    });

    // 결과 모달의 확인 버튼 클릭 시
    if (confirmButton) {
        confirmButton.addEventListener('click', () => {
            closeModal(resultModal);
        });
    }

    // 모달 외부 클릭 시 닫기
    [findIdModal, findPwModal, resultModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                // 모달 오버레이를 직접 클릭했을 때만 닫기
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        }
    });


    // --- 폼 제출 (프론트엔드 더미 로직) ---

    // 아이디 찾기 폼 제출
    const findIdForm = findIdModal.querySelector('.modal-form');
    if (findIdForm) {
        findIdForm.addEventListener('submit', (e) => {
            e.preventDefault(); // 기본 폼 제출 방지

            const name = document.getElementById('find-id-name').value;
            const email = document.getElementById('find-id-email').value;

            // 여기서는 임시로 고정된 아이디를 보여줍니다.
            // 실제로는 백엔드와 통신하여 이름과 이메일로 아이디를 조회해야 합니다.
            // 성공 시
            const dummyFoundId = "testuser123"; // 예시 아이디
            document.getElementById('found-id-display').textContent = dummyFoundId;
            closeModal(findIdModal); // 아이디 찾기 모달 닫고
            openModal(resultModal); // 결과 모달 열기

            // 실패 시 (예시)
            // alert("일치하는 정보가 없습니다. 다시 확인해주세요.");
        });
    }

    // 비밀번호 찾기 폼 제출
    const findPwForm = findPwModal.querySelector('.modal-form');
    if (findPwForm) {
        findPwForm.addEventListener('submit', (e) => {
            e.preventDefault(); // 기본 폼 제출 방지

            const username = document.getElementById('find-pw-username').value;
            const name = document.getElementById('find-pw-name').value;
            const email = document.getElementById('find-pw-email').value;

            // 여기서는 임시로 성공 메시지를 보여줍니다.
            // 실제로는 백엔드와 통신하여 정보 확인 후 비밀번호 재설정 링크를 보내거나
            // 새 비밀번호 설정 필드를 보여주는 로직이 필요합니다.
            alert(`입력하신 ${username}님 정보가 확인되었습니다. 
            비밀번호 재설정 링크가 ${email}로 발송되었습니다.`);
            closeModal(findPwModal);
        });
    }

});