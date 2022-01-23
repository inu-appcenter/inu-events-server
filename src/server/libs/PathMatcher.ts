import AntPathMatcher from 'ant-path-matcher';

/**
 * 요청의 경로가 미리 지정한 경로에 해당하는지 알려줍니다.
 *
 * 경로를 미리 지정할 때에는 ant pattern 을 사용합니다. 요기 참조: https://lng1982.tistory.com/169
 */
export default class PathMatcher {
  private antMatcher = new AntPathMatcher();

  constructor(private readonly pathPatterns: string[]) {
  }

  /**
   * 요청 들어온 경로가 미리 설정된 허용리스트 목록 중 최소 1개 이상의 패턴과 매치되는지 알려줍니다.
   *
   * @param requestPath 요청 들어온 경로
   */
  anyMatch(requestPath: string): Boolean {
    for (const pattern of this.pathPatterns) {
      if (this.antMatcher.match(pattern, requestPath)) {
        return true;
      }
    }

    return false;
  }
}
