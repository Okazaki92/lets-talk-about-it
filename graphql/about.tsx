export const aboutQuery = `
query MyQuery($locale: SiteLocale) {
  about(locale: $locale) {
    id
    title
    description {
      value
    }
    malgosiaDescription {
      value
    }
    malgosiaImage {
      responsiveImage {
        alt
        base64
        bgColor
        title
        webpSrcSet
      }
    }
  }
}`;
