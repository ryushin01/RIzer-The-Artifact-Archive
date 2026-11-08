/** 시드 유물의 영어 번역. 주석은 시드 주석과 같은 순서다. */
export type EnArtifact = {
  title: string;
  owner: string;
  maker: string;
  power: string;
  firstRecord: string;
  summary: string;
  story: string;
  imageAlt: string;
  annotations: { title: string; body: string }[];
};
