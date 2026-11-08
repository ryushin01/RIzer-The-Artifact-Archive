"use client";

import styled from "styled-components";

import { media } from "@/shared/config";
import { Container, SectionHeader } from "@/shared/ui";

const QUESTIONS = [
  {
    q: "이 유물들은 실제로 있나요?",
    a: "아니요. 엑스칼리버, 성배, 묠니르 같은 유물은 신화와 전설 속에만 있습니다. 이 아카이브는 '전설이 실물을 남겼다면'이라는 상상에서 출발한 가상 전시입니다. 해설은 각 전설을 처음 기록한 문헌을 바탕으로 썼습니다.",
  },
  {
    q: "그럼 사진 속 물건은 무엇인가요?",
    a: "모습이 닮은 실제 박물관 소장품입니다. 예를 들어 성배 자리에는 한때 '진짜 성배'로 소개된 6세기 비잔티움의 안티오크 성배를, 쿠사나기 자리에는 6세기 일본의 곧은 칼들을 두었습니다. 유물 화면의 '이미지 출처'에서 실제 소장품 이름과 소장처를 확인할 수 있습니다. 천부인은 세 소장품 사진을 이어 붙인 합성 이미지입니다.",
  },
  {
    q: "사진을 어떻게 그렇게 크게 확대할 수 있나요?",
    a: "원본 사진을 256~512픽셀 조각(타일) 수백~수천 개로 잘라 여러 배율로 저장해 두는 '딥줌' 방식을 씁니다. 화면에 보이는 부분의 조각만 내려받기 때문에, 원본이 커도 처음 화면은 가볍게 열리고 확대할수록 선명한 조각이 채워집니다.",
  },
  {
    q: "이미지를 가져다 써도 되나요?",
    a: "사진은 모두 메트로폴리탄 미술관과 클리블랜드 미술관이 공개 도메인(CC0)으로 내놓은 자료라 자유롭게 쓸 수 있습니다. 다만 해설과 주석, 합성 이미지는 이 프로젝트에서 만든 것입니다.",
  },
  {
    q: "주석은 누가 다나요?",
    a: "큐레이터가 관리 화면에서 사진 위에 영역을 그리고 설명을 씁니다. 관리 화면은 게스트 계정으로 둘러볼 수 있습니다.",
  },
  {
    q: "움직임이 불편해요.",
    a: "아래 메뉴의 물결 모양 버튼으로 스크롤 연출, 자동 전환, 커서 효과를 모두 멈출 수 있습니다. 운영체제에서 '동작 줄이기'를 켜 두었다면 처음부터 멈춘 상태로 보입니다.",
  },
];

/** 자주 묻는 질문. 밝은 바탕으로 앞 섹션들과 구분한다. details/summary라 키보드로 펼친다. */
export function Faq() {
  return (
    <Section id="faq" aria-labelledby="faq-title">
      <Container>
        <Grid>
          <SectionHeader
            index="04"
            label="Questions"
            titleId="faq-title"
            title="전설을 전시하는 방법에 대한 질문"
            tone="light"
          />
          <List>
            {QUESTIONS.map((item, i) => (
              <details key={item.q} open={i === 0}>
                <summary>
                  <h3>{item.q}</h3>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </List>
        </Grid>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 120px 0;
  background: ${({ theme }) => theme.color.paper};
  color: ${({ theme }) => theme.color.ink};
  scroll-margin-top: 24px;
  /* 밝은 바탕에서는 노란 초점 표시가 잘 보이지 않아 진한 파랑으로 바꾼다(KWCAG 6.1.2). */
  *:focus-visible {
    outline-color: #1a4dd6;
  }
`;
const Grid = styled.div`
  display: grid;
  gap: 48px;
  ${media.md} {
    grid-template-columns: 1fr 1.4fr;
  }
`;
const List = styled.div`
  border-top: 1px solid rgba(20, 20, 20, 0.2);
  details {
    border-bottom: 1px solid rgba(20, 20, 20, 0.2);
  }
  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-height: 64px;
    padding: 16px 0;
    cursor: pointer;
    list-style: none;
    &::-webkit-details-marker {
      display: none;
    }
    &::after {
      content: "+";
      font-family: ${({ theme }) => theme.font.mono};
      font-size: 22px;
      transition: transform 0.3s;
    }
  }
  details[open] summary::after {
    transform: rotate(45deg);
  }
  h3 {
    font-size: 18px;
    font-weight: 700;
  }
  p {
    padding-bottom: 24px;
    color: ${({ theme }) => theme.color.inkMuted};
    max-width: 40em;
  }
`;
