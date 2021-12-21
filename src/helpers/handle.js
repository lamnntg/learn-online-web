const handlePathName = (pathName) => {
  if (pathName.indexOf('classroom/') !== -1) {
    return 'Chi tiết lớp học';
  }

  switch (pathName) {
    case "classroom":
      pathName = "Lớp học"
      break;
    case "dashboard":
      pathName = "Home"
      break;
    default:
      break;
  }

  return pathName;
}

export const handle = { handlePathName };