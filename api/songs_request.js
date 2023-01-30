import axios from 'axios';
import {XRapidAPIHost, XRapidAPIKey} from '../env';
export const song_axios_options = urlTrack => ({
  method: 'GET',
  url: 'https://soundcloud-scraper.p.rapidapi.com/v1/track/metadata',
  params: {track: urlTrack},
  // params: {track: 'https://soundcloud.com/persiaholder/control-zoe-wees'},
  // params: {
  //   track: 'https://soundcloud.com/luis-cervantes-37/james-arthur-train-wreck',
  // },
  headers: {
    'X-RapidAPI-Key': XRapidAPIKey,
    'X-RapidAPI-Host': XRapidAPIHost,
  },
});

// export const multipleSongsRequest = async () => {
//   const firstSong = await songRequest(
//     'https://soundcloud.com/edsheeran/photograph',
//   );
//   const secondSong = await songRequest(
//     'https://soundcloud.com/luis-cervantes-37/james-arthur-train-wreck',
//   );
//   return [firstSong, secondSong];
// };

export const songRequest = url =>
  axios
    .request(song_axios_options(url))
    .then(function (response) {
      const responseMapped = {
        id: response.data.id,
        title: response.data.title,
        artist: response.data.labelName,
        // artwork: response.data.artworkUrl,
        artwork: require('../assets/song-images/not_found_image.png'),
        url: response.data.audio[0].url,
        duration: 161,
      };
      return responseMapped;
    })
    .catch(function (error) {
      console.error(error);
    });
