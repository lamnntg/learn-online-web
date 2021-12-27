const handlePathName = (pathName) => {
  var listPath = {
    pathName: "",
    subPathName: "",
    url: "#",
  };

  if (pathName.indexOf('classroom/') !== -1 && pathName.indexOf('/exam') !== -1) {
    return {
      ...listPath,
      pathName: "Chi tiết lớp học",
      subPathName: "Bài Kiểm tra",
      url: `/classroom/${pathName.split("/")[1]}`,
    };
  }

  if (pathName.indexOf('classroom/') !== -1 && pathName.indexOf('/homework') !== -1) {
    return {
      ...listPath,
      pathName: "Chi tiết lớp học",
      subPathName: "Bài tập",
    };
  }
  if (pathName.indexOf('classroom/') !== -1 && pathName.indexOf('/people') !== -1) {
    return {
      ...listPath,
      pathName: "Chi tiết lớp học",
      subPathName: "Thành viên",
    };
  }

  if (pathName.indexOf('classroom/') !== -1) {
    return {
      ...listPath,
      pathName: "Chi tiết lớp học",
      subPathName: "Chi tiết lớp học",
    };
  }

  switch (pathName) {
    case "classroom":
      listPath.pathName = "Lớp học"
      listPath.subPathName = "Lớp học";
      break;
    case "dashboard":
      listPath.pathName = "Home"
      listPath.subPathName = "Home";
      break;
    default:
      break;
  }

  return listPath;
}

export const handle = { handlePathName };