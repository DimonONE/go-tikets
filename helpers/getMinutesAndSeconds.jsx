const getMinutesAndSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds - minutes * 60 || '0';

  if (secondsLeft < 10) {
    return `0${minutes}:0${secondsLeft}`;
  }

  return `0${minutes}:${secondsLeft}`;
};

export default getMinutesAndSeconds;
