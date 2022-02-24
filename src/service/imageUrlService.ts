
class ImageUrlService {
  async makeUrl(imageUuid: string) : Promise<string>{
    const imageUrl = `http://uniletter.inuappcenter.kr/images/${imageUuid}`;
    return imageUrl;
  }

}

export default new ImageUrlService();
