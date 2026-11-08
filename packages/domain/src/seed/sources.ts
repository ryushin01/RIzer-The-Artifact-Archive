import type { ArtifactSource } from "../artifact";

/** 메트로폴리탄 미술관(The Met) Open Access CC0 소장품 출처 */
export const met = (
  objectId: number,
  objectTitle: string,
  objectCulture: string,
  objectDate: string,
  imageUrl: string,
  accessionNumber: string,
  creditLine: string,
): ArtifactSource => ({
  institution: "The Metropolitan Museum of Art",
  objectId: String(objectId),
  objectTitle,
  objectCulture,
  objectDate,
  url: `https://www.metmuseum.org/art/collection/search/${objectId}`,
  imageUrl,
  license: "CC0-1.0",
  creditLine,
  accessionNumber,
  parts: [],
});

/** 클리블랜드 미술관 Open Access CC0 소장품 출처. The Met에 맞는 소장품이 없을 때 쓴다. */
export const cma = (
  objectId: number,
  objectTitle: string,
  objectCulture: string,
  objectDate: string,
  imageUrl: string,
  accessionNumber: string,
  creditLine: string,
): ArtifactSource => ({
  institution: "The Cleveland Museum of Art",
  objectId: String(objectId),
  objectTitle,
  objectCulture,
  objectDate,
  url: `https://clevelandart.org/art/${accessionNumber}`,
  imageUrl,
  license: "CC0-1.0",
  creditLine,
  accessionNumber,
  parts: [],
});
