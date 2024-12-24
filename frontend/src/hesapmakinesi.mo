actor hesap_makinesi {
  var hucre: Int = 0;

  public func toplama(s: Int): async Int {
    hucre += s;
    return hucre;
  };

  public func cikarma(s: Int): async Int {
    hucre -= s;
    return hucre;
  };

  public func carpma(s: Int): async Int {
    hucre *= s;
    return hucre;
  };

  public func bolme(s: Int): async ?Int {
    if (s == 0) {
      return null;
    } else {
      hucre /= s;
      return ?hucre;
    }
  };

  public func temizle(): async () {
    hucre := 0;
    return ();
  };
};
