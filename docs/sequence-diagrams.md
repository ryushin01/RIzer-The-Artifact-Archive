# 시퀀스 다이어그램

RIzer의 주요 흐름입니다. 구성 설명은 [아키텍처](architecture.md)에 있고, 여기서는 시간 순서로 그립니다.

## 1. 공개 사이트 조회와 저장 후 갱신

관리 화면(`apps/admin`)이 데이터의 주인이고, 공개 사이트(`apps/web`)는 공개 API를 캐시해 읽습니다.

```mermaid
sequenceDiagram
    actor 방문자
    actor 큐레이터
    participant 웹 as 공개 사이트<br/>(서버 컴포넌트, 'use cache' + cacheTag)
    participant 공개API as admin /api/public/artifacts
    participant 관리 as 관리 화면 (서버 액션)
    participant DB as PostgreSQL
    participant 갱신 as web /api/revalidate

    방문자->>웹: /artifacts/excalibur
    alt 캐시에 있음
        웹-->>방문자: 캐시된 화면
    else
        웹->>공개API: GET (locale)
        공개API->>DB: 공개 상태의 유물만
        공개API->>공개API: 스토리지 키를 공개 주소로, 영어판은 시드 그대로인 필드만 번역
        공개API-->>웹: 유물, 주석
        웹-->>방문자: 화면
    end
    큐레이터->>관리: 해설·주석 저장
    관리->>DB: 저장
    관리->>갱신: notifyWeb([slug]) (Bearer 비밀값)
    갱신->>갱신: 시간 차 없는 비교로 비밀값 확인
    갱신->>웹: 해당 캐시 태그 비우기
    Note over 웹: 다음 방문부터 새 내용
```

## 2. 아카이브 검색 (redux-saga)

```mermaid
sequenceDiagram
    actor 방문자
    participant 화면 as 아카이브 화면
    participant 스토어 as Redux 스토어<br/>(archive 슬라이스)
    participant 사가 as archiveSaga
    participant 공개API as admin /api/public/artifacts

    방문자->>화면: 검색어 입력
    화면->>스토어: queryChanged({ q })
    스토어->>사가: takeLatest
    사가->>사가: 300ms 기다림 (그사이 새 입력이 오면 이전 작업 취소)
    사가->>공개API: fetchArtifacts(조건, limit 24)
    공개API-->>사가: 결과, 전체 개수
    사가->>스토어: fetchSucceeded
    사가->>화면: 주소를 조건과 맞춤 (replaceState)
    방문자->>화면: 전시실·종류·정렬 버튼
    화면->>스토어: queryChanged (기다리지 않고 바로 읽음)
    방문자->>화면: "더 보기" (여러 번 눌러도)
    화면->>스토어: moreRequested
    스토어->>사가: takeLeading (한 번만)
    사가->>공개API: offset = 보이는 개수
    공개API-->>사가: 다음 묶음
    사가->>스토어: moreSucceeded (그사이 조건이 바뀌었으면 버림)
```

## 3. 원본 업로드와 딥줌 타일 생성

```mermaid
sequenceDiagram
    actor 큐레이터
    participant 업로더 as ImageUploader<br/>(관리 화면)
    participant 액션 as requestUploadAction /<br/>processUploadAction
    participant 스토리지 as Vercel Blob (또는 R2)
    participant 타일 as tileAndUpload<br/>(packages/tiles, sharp)
    participant DB as PostgreSQL
    participant 웹 as 공개 사이트

    큐레이터->>업로더: 원본 고르기
    업로더->>액션: requestUploadAction(형식, 크기)
    액션->>액션: 편집 권한(게스트는 읽기 전용), JPG·PNG·WebP·TIFF, 80MB 이하
    alt 서명된 주소를 줄 수 있음
        액션-->>업로더: presigned PUT 주소
        업로더->>스토리지: 원본 직접 업로드 (진행률 표시)
        업로더->>액션: processUploadAction(key)
        액션->>스토리지: 원본 읽기
        액션->>타일: 254px WebP DZI 피라미드, 미리보기, LQIP, 대표 색
        타일->>스토리지: 버전 붙은 키(artifacts/<id>/v<시각>/)로 저장, 이전 버전 삭제
        액션->>DB: 이미지 정보 저장
        액션->>웹: notifyWeb([slug])
        액션-->>업로더: "타일 N개를 만들었습니다"
    else 개발 환경
        액션-->>업로더: /api/artifacts/:id/image 로 직접 업로드
    end
```
