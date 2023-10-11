import { PATHNAME } from "../../../../configs/pathname";

export interface IMenu {
    name: string;
    icon: string;
    link: string;
    isPopup?: boolean;
}

export const menu: IMenu[] = [
    {
        name: 'Thông báo',
        icon: 'notification-bold',
        link: PATHNAME.SCREENDASHBOARD,
        isPopup: true,
    },
    {
        name: 'Trang quản trị',
        icon: 'home-bold',
        link: PATHNAME.SCREENDASHBOARD,
    }
]