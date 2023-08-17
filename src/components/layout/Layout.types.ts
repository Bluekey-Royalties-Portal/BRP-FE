import { SetStateAction } from "react";

export interface IUserInfo {
  type: "SUPER_ADMIN" | "ADMIN" | "ARTIST"
}

export interface GnbInfoProps extends IUserInfo {
  loginId: string,
  profileImage: string | null,
}

export interface SideNavProps extends IUserInfo {
  isOpen: boolean,
  setIsOpen: React.Dispatch<SetStateAction<boolean>>,
}
