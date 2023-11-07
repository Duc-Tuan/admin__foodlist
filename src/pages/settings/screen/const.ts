import { PATHNAME } from "../../../configs/pathname";

export interface INavMenu {
    id: number;
    name: string;
    icon: string;
    desc: string;
    link: string;
}

export const fakeNav: INavMenu[] = [
    {
        id: 1,
        name: 'Thông tin cửa hàng',
        desc: 'Quản lý thông tin liên hệ và địa chỉ của cửa hàng',
        icon: 'v2_storefont',
        link: PATHNAME.SCREENSETTINGSTORE
    },
    {
        id: 2,
        name: 'Mẫu in',
        desc: 'Thiết lập & tùy chỉnh các mẫu in mặc định của phiếu',
        icon: 'v2_printer',
        link: PATHNAME.SCREENSETTINGPRINT
    },
    {
        id: 3,
        name: 'Tin nhắn',
        desc: 'Thiết lập chức năng nhắn tin với khách hàng',
        icon: 'icon-chat',
        link: PATHNAME.SCREENSETTINGCHAT
    },
    {
        id: 4,
        name: 'Thông báo',
        desc: 'Thiết lập chức năng thông báo của hệ thống',
        icon: 'notification-v2',
        link: PATHNAME.SCREENSETTINGNOTIFI
    },
    {
        id: 5,
        name: 'Ngôn ngữ',
        desc: 'Thiết lập chức năng chuyển đổi ngôn ngữ của hệ thống',
        icon: 'icon-language',
        link: PATHNAME.SCREENSETTINGLANGUAGE
    },
]