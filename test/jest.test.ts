describe("simple test", () => {
  
    it('1 + 1 = 2 ?', () => {
      expect(1+1).not.toEqual(1);
    });
    //failed
    it('2 + 3 = 5 ?', () => {
      expect(2+3).toBe(5);
    });
    //passed
  })
  