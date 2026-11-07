"use client";

import styled from "styled-components";

import { media } from "@/shared/config/theme";
import { Container, MonoLabel } from "@/shared/ui";

/** 바닥글: 이미지 출처와 프로젝트 정보 */
export function SiteFooter({ adminUrl }: { adminUrl?: string }) {
  return (
    <Footer>
      <Container>
        <Grid>
          <div>
            <Brand>RIZER</Brand>
            <MonoLabel>THE ARTIFACT ARCHIVE</MonoLabel>
          </div>
          <p>
            전설 속 유물은 실물이 없습니다. 이 아카이브의 사진은 모습이 닮은 실제 소장품을 빌려 썼으며, 모두{" "}
            <a href="https://www.metmuseum.org/hubs/open-access" target="_blank" rel="noreferrer">
              메트로폴리탄 미술관 Open Access(CC0)
              <span className="sr-only"> (새 창)</span>
            </a>{" "}
            자료입니다. 해설과 주석은 이 프로젝트에서 새로 썼습니다.
          </p>
          <Links>
            {adminUrl && (
              <li>
                <a href={adminUrl} target="_blank" rel="noreferrer">
                  관리 화면 데모<span className="sr-only"> (새 창)</span>
                </a>
              </li>
            )}
            <li>
              <a href="https://github.com/ryushin01/RIzer-The-Artifact-Archive" target="_blank" rel="noreferrer">
                GitHub<span className="sr-only"> (새 창)</span>
              </a>
            </li>
          </Links>
        </Grid>
      </Container>
    </Footer>
  );
}

const Footer = styled.footer`
  padding: 64px 0 128px;
  border-top: 1px solid ${({ theme }) => theme.color.line};
  color: ${({ theme }) => theme.color.muted};
  font-size: 14px;
  a {
    color: ${({ theme }) => theme.color.text};
    text-underline-offset: 4px;
  }
`;
const Grid = styled.div`
  display: grid;
  gap: 32px;
  ${media.md} {
    grid-template-columns: 1fr 2fr auto;
  }
`;
const Brand = styled.p`
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 800;
  font-size: 28px;
  color: ${({ theme }) => theme.color.text};
`;
const Links = styled.ul`
  list-style: none;
  display: grid;
  gap: 8px;
`;
