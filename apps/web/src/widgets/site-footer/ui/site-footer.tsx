"use client";

import { usePathname } from "next/navigation";
import styled from "styled-components";

import { media } from "@/shared/config";
import { otherLocalePath, useLocale, useMessages } from "@/shared/i18n";
import { Container, MonoLabel } from "@/shared/ui";

/** 함께 배포한 Storybook. 개발 서버에는 빌드 결과물이 없어 Storybook 개발 서버로 보낸다. */
const STORYBOOK_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:6006"
    : "/storybook/index.html";

/** 이미지·글꼴의 출처는 화면이 아니라 README의 '출처' 표에 있습니다. */
const SOURCES_URL = "https://github.com/ryushin01/Rizer-The-Artifact-Archive#출처";

/** 바닥글: 프로젝트 정보와 README 출처 링크 */
export function SiteFooter({ adminUrl }: { adminUrl?: string }) {
  const locale = useLocale();
  const { footer: t, newWindow } = useMessages();
  const pathname = usePathname();
  return (
    <Footer>
      <Container>
        <Grid>
          <div>
            <Brand>RIZER</Brand>
            <MonoLabel>THE ARTIFACT ARCHIVE</MonoLabel>
          </div>
          <p>
            {t.note}{" "}
            <a href={SOURCES_URL} target="_blank" rel="noreferrer">
              {t.sources}
              <span className="sr-only">{newWindow}</span>
            </a>
          </p>
          <Links>
            {adminUrl && (
              <li>
                <a href={adminUrl} target="_blank" rel="noreferrer">
                  {t.admin}
                  <span className="sr-only">{newWindow}</span>
                </a>
              </li>
            )}
            <li>
              <a href={STORYBOOK_URL}>{t.storybook}</a>
            </li>
            <li>
              <a
                href="https://github.com/ryushin01/Rizer-The-Artifact-Archive"
                target="_blank"
                rel="noreferrer"
              >
                GitHub<span className="sr-only">{newWindow}</span>
              </a>
            </li>
            <li>
              <a
                href={otherLocalePath(locale, pathname)}
                lang={locale === "ko" ? "en" : "ko"}
              >
                {t.language}
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
