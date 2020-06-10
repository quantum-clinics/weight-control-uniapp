function formatTime(targetTime) {
  const date = new Date(targetTime);
  const YY = date.getFullYear();
  const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  const DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  return `${YY}年${MM}月${DD}日`
}

export {
  formatTime,
}
