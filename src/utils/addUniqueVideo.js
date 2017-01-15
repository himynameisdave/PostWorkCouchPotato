const addUniqueVideo = (oldVideos, newVideos) => {
  let unique = [];
  return oldVideos.concat(newVideos).filter((video) => {
    if (!unique.includes(video.id) && !video.watchddit.watchedVideo) {
      unique = unique.concat([video.id]);
      return true;
    }
    return false;
  });
};

export default addUniqueVideo;
