import { Eye } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@rizer/ui/components/alert";

/** 게스트 계정에 보여 주는 안내 */
export function ReadOnlyBanner() {
  return (
    <Alert>
      <Eye />
      <AlertTitle>게스트로 둘러보는 중입니다</AlertTitle>
      <AlertDescription>모든 화면을 볼 수 있지만, 저장·삭제·업로드는 큐레이터 계정만 할 수 있습니다.</AlertDescription>
    </Alert>
  );
}
