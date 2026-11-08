"use client";

import { usePathname } from "next/navigation";
import styled from "styled-components";

import { media } from "@/shared/config";
import { otherLocalePath, useLocale, useMessages } from "@/shared/i18n";
import { Container, MonoLabel } from "@/shared/ui";

/** 바닥글: 이미지 출처와 프로젝트 정보 */
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
            {t.before}
            <a href="https://www.metmuseum.org/hubs/open-access" target="_blank" rel="noreferrer">
              {t.met}
              <span className="sr-only">{newWindow}</span>
            </a>
            {t.and}
            <a href="https://www.clevelandart.org/open-access" target="_blank" rel="noreferrer">
              {t.cleveland}
              <span className="sr-only">{newWindow}</span>
            </a>
            {t.after}
          </p>
          <Links>
            {adminUrl && (
              <li>
                <a href={adminUrl} target="_blank" rel="noreferrer">
                  {t.admin}<span className="sr-only">{newWindow}</span>
                </a>
              </li>
            )}
            <li>
              <a href="https://github.com/ryushin01/RIzer-The-Artifact-Archive" target="_blank" rel="noreferrer">
                GitHub<span className="sr-only">{newWindow}</span>
              </a>
            </li>
            <li>
              <a href={otherLocalePath(locale, pathname)} lang={locale === "ko" ? "en" : "ko"}>
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
