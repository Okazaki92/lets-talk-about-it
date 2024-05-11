export const editionQuery = `
query MyQuery($locale: SiteLocale, $edition: String) {
  event(locale: $locale, filter: {edition: {eq: $edition}}) {
    id
    title
    edition
    new
    date
    sign
    location 
    lead {
        name
        role
        image {
            url
        }
    }
    speakers {
        name
        role
        image {
            url
        }
    }
gallery {
  responsiveImage {
        alt
        base64
        bgColor
        title
        aspectRatio
        height
        sizes
        src
        width
      }
}
  }
}`;
