import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const currentPlayingTime = localStorage.getItem('videoplayer-current-time');

if (currentPlayingTime !== null) {
  player.setCurrentTime(currentPlayingTime);
}

const onPlay = function (data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));
