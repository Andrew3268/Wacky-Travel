# wackyTravel V12 변경사항

## Post H2 접두어 자동 스타일 기능

- 발행된 post 상세 페이지에서 H2 앞 숫자 자동 배지를 제거했습니다.
- `## 위치 접근성: 제목`처럼 H2를 작성하면 `위치 접근성:` 접두어 부분만 자동으로 `<span class="post-h2-prefix">`로 감싸지도록 수정했습니다.
- 접두어 뒤 본문 제목은 `<span class="post-h2-text">`로 분리됩니다.
- add 페이지 미리보기와 edit 페이지 미리보기에도 동일하게 적용했습니다.
- 모바일에서는 접두어 배지와 제목이 세로로 자연스럽게 쌓이도록 CSS를 보완했습니다.

## 수정 파일

- `lib/posts/renderer.js`
- `public/assets/js/add.js`
- `public/assets/js/edit.js`
- `public/assets/css/app.css`
