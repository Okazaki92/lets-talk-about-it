export const aboutQuery = `
query MyQuery($locale: SiteLocale) {
  about(locale: $locale) {
    
    description {
      value
    }
    malgosiaDescription {
      value
    }
    malgosiaImage {
      responsiveImage(
        imgixParams: { fit: crop, w: 300, h: 300, auto: format, q: 75 }
      ) {
        alt
        base64
        bgColor
        title
        aspectRatio
        height
        sizes
        src
        srcSet
        webpSrcSet
        width
      }
    }
  }
}`;
