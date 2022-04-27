## Describes the solution

1.  이번 과제에서 사용한 라이브러리는 다음과 같습니다.

    - react
    - typescript
    - redux-toolkit (중앙 상태 관리)
    - emotion (CSS in JS)
    - prettier
    - eslint

2.  과제 구현 목록

    - 리소스는 전역 데이터로 redux 내에서 url과 image가 분리되어 관리됩니다.
    - redux 내의 viewSlice는 viewer에서 보여줄 데이터를 관리합니다.

    - 화면은 Editor 영역과 Viewer 영역으로 나뉘고 App에서 합쳐집니다.

    1.  Editor 영역은 리소스 리스트가 보이고/추가/삭제/이름 변경이 가능합니다.

        - 리소스 추가 시 준수해야하는 사항

        1. “https://” 또는 “http://” scheme 이 포함되어야 한다. - 입력한 문자열에 includes() 함수를 이용해 http://나 https:// 가 있는지 판단하고, 없으면 입력창에 에러메시지를 보여줍니다.

           ```javascript
           export default function checkExistenceOfScheme(url: string) {
             if (url && (url.indexOf('http://') === 0 || url.indexOf('https://') === 0)) {
               return true;
             }
             return false; //utils/scheme.ts
           }
           ```

    2.  youtube url은 embed url로 변경해야 한다.

        - 입력한 문자열에 'youtube'가 있으면 'watch?v='를 'embed/'로 변경합니다.
        - 영상의 번호와 도메인을 추출해 재조합 하려했으나, 모바일로 접속했을 때 유튜브 영상 번호는 -같은 특수문자도 포함하기 때문에 영상 번호의 규칙을 찾지 못하고 가장 정답과 근접하다고 판단한 방법을 사용했습니다.

        ```javascript
        export default function checkYoutubeAndChangeToEmbedUrl(url: string) {
          if (url && url.includes('youtube')) {
            return url.replace('watch?v=', 'embed/');
          }

          return url; //utils/embedUrl.ts
        }
        ```

    3.  반드시 보여야 하는 url
        - redux의 urlSlice 스토어 내부에 기본 값으로 저장했습니다.
    4.  리소스 이름은 url만 변경이 가능합니다.

        - 실제 typed 서비스에서도 이미지 파일은 이름 변경이 불가능해 url만 변경 가능하도록 구현했습니다.
        - url을 저장할 때 {url, name, time}으로 최초 name은 url과 동일하게 저장하고 이후에는 name을 변경해 url은 등록 시 url을 유지합니다.

    5.  image 리소스

        1.  .png, .jpg만 업로드 되면 된다.
        2.  동시에 여러개의 이미지를 올릴 수 있어야 한다.
            ```HTML
            <input
            type="file"
            id="images"
            accept=".jpg, .png"
            multiple
            hidden
            ref={imageInputRef}
            onChange={handleChangeImages}
            />
            ```
            accept=".jpg, .png"로 이미지 파일 확장자를 제한했습니다.
            multiple으로 다중 선택이 가능합니다.
        3.  각 이미지 별로 validation이 일어나야 한다.
            1. 300ms ~ 1000ms 랜덤 딜레이가 일어나야 한다.
            2. 등록시 성공할 확률이 80%이어야 한다.
            3. 성공시 성공 토스트가 떠야 한다. (디자인 시안 없습니다.)
            4. 실패시 실패 토스트가 떠야 한다. (디자인 시안 없습니다.)

        ```javascript
        const handleChangeImages = useCallback(
            async (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                    for (let i = 0; i < e.target.files.length; i++) {
                        const uploadTime = Math.random() \* 1000;
                        const image = e.target.files[i];

                        if (uploadTime >= 300 && uploadTime <= 1000) {
                            setIsuploadSuccess(true);
                            setNumber(i);
                            await setTimeout(function () {
                            dispatch(add({ image, time: new Date().getTime() + i }));
                            }, uploadTime);
                        } else {
                            setNumber(i);
                            setIsuploadFailure(true);
                        }
                            await setTimeout(function () {
                            setIsuploadSuccess(false);
                            setIsuploadFailure(false);
                            }, 2000);
                    }
                }
            },
            [dispatch],
        );
        ```

        위와 같이 구현했습니다. 원래 의도대로 사진이 차례대로 하나씩 올라가면서 성공/실패 토스트 메시지를 육안으로 확인할 수 있도록 작성하려했으나,<br/>
        dispatch와 동시에 화면에 이미지가 들어있는 List item이 보이면서 리렌더링으로 마지막 토스트 메시지만 확인할 수 있습니다.<br/>
        이 부분은 해결 방법을 찾지 못한 버그입니다.<br/>
        그리고 if-else가 아닌 if-return문으로 구현하는게 안전한 것은 인지하고 있으나, <br/>
        조건에 위배되는 경우에 return을 하면 함수가 완전히 끝나 다음 파일을 추가할 수 없고,<br/>
        if조건 안에 있는 값 외에는 모든 상황을 실패로 가정하기 위해서는 else문을 쓰는거 더 적합하다고 판단했습니다.<br/>

3.  url 리소스와 image 리소스를 클릭하면 뷰어에 리소스가 보여야한다. -> 구현 완료
4.  뷰어는 닫을 수 있어야 한다. -> 구현 완료
5.  url 리소스 뷰어는 `<iframe>` 태그를 활용한다. -> 구현 완료

6.  기타 디테일한 구현
    - url 추가로 url 최초 입력 시 input 창 focus를 해제하면 input 창이 사라집니다. (입력값이 저장되지는 않습니다.)
    - url 수정 시 연필 아이콘을 클릭하거나 input 창 focus를 해제하면 입력했던 값이 반영됩니다.
    - 리소스 아이템이 쌓여 뷰포트 height를 넘어가면 스크롤이 됩니다.
    - 리소스 아이템은 최신 추가 순으로 정렬됩니다.
    - 리소스 아이템 내 url이나 파일 이름은 2줄을 넘어가면 말줄임 표시가 나오도록 대응했습니다.
    - 뷰어 상단의 파일 이름/url 이름을 나타내는 칸은 App의 width가 줄어들면 말줄임 표시가 나오도록 대응했습니다.
