export const handleTime = (dataD) => {
  let data = new Date(dataD);
  let hrs = data.getHours();
  let mins = data.getMinutes();
  let secs = data.getSeconds();

  if (hrs > 12) hrs -= 12;
  const postTime = hrs + ":" + mins + ":" + secs;
  return postTime;
};

export const handleDate = (dataD) => {
  let dateInfo = new Date(dataD);
  let day = dateInfo.getDate();
  let month = dateInfo.getMonth() + 1;
  let year = dateInfo.getFullYear();

  return `${day}/${month}/${year}`;
};
