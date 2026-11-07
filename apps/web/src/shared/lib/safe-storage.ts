/** localStorage 읽기·쓰기. 사생활 보호 모드 등에서 막혀도 화면이 깨지지 않게 오류를 삼킨다. */
export const safeStorage = {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* 저장하지 못해도 기능에는 지장이 없다. */
    }
  },
};

export const sessionFlag = {
  get(key: string): boolean {
    try {
      return window.sessionStorage.getItem(key) === "1";
    } catch {
      return false;
    }
  },
  set(key: string) {
    try {
      window.sessionStorage.setItem(key, "1");
    } catch {
      /* 무시 */
    }
  },
};
