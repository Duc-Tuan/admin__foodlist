import { ICommon } from "../../../types/general";

export interface ILogin {
    usename: string;
    password: string;
}

export interface IUsers extends ICommon {
    userRoles: string[];
    userNickname: string;
    userGender: string;
    userAdrressDesc: string;
    userProvinceCity: string;
    userDistrict: string;
    userCommune: string;
    userAge: string;
    userEmail: string;
    userPhone: string;
    userName: string;
    userStatus: string;
    userImage: string;
}