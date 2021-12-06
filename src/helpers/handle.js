const handlePathName = (pathName) => {
  if (pathName.indexOf('classroom/') !== -1) {
    return 'Classroom Details';
  }

  return pathName;
}

export const handle = { handlePathName };