class ImageUrlService {
  /**
   * 주어진 UUID로부터 URL을 만들어냅니다.
   * 만약 주어진게 없으면(undefined)? 리턴도 undefined.
   *
   * @param imageUuid 주어진 UUID.
   */
  async makeUrl(imageUuid?: string): Promise<string | undefined> {
    return imageUuid ? `http://uniletter.inuappcenter.kr/images/${imageUuid}` : undefined;
  }
}

export default new ImageUrlService();
