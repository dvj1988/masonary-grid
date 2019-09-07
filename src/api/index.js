import axios from "axios";
import parser from "xml-to-json-promise";

export const getTiles = () => {
  return axios
    .get(
      "https://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=667a6ce5f358b237ec13e9d99bb659de&group_id=2309748%40N20&format=rest"
    )
    .then(async res => {
      const {
        rsp: {
          photos: [{ photo: photos }]
        }
      } = await parser.xmlDataToJSON(res.data);

      return photos.map(p => p.$);
    });
};
