import { ROLE_MODERATOR, ROLE_ADMIN} from "./../utils/constants";

export const checkModerator = (roles) => {
  if (roles.includes(ROLE_MODERATOR) || roles.includes(ROLE_ADMIN)) {
    return true;
  }

  return false;
}