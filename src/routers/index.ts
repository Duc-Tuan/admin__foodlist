import { PATHNAME } from "../configs/pathname";
import { ScreenStaff, ScreenUsers } from "../pages/accounts";
import { ScreenDashboard } from "../pages/dashboard";
import { ScreenLogin } from "../pages/login";
import { ScreenOrders } from "../pages/orders";
import ScreenPrommotions from "../pages/prommotions";
import { IRouter } from "./types";

export const privateRouters: IRouter[] = [
    {
        title: 'Dashboard | admin',
        path: PATHNAME.SCREENDASHBOARD,
        component: ScreenDashboard
    },
    {
        title: 'Đơn hàng | admin',
        path: PATHNAME.SCREENORDER,
        component: ScreenOrders
    },
    {
        title: 'Khuyến mãi | admin',
        path: PATHNAME.SCREENPROMMOTIONS,
        component: ScreenPrommotions
    },
    {
        title: 'Nhân viên | admin',
        path: PATHNAME.SCREENSTAFF,
        component: ScreenStaff
    },
    {
        title: 'Khách hàng | admin',
        path: PATHNAME.SCREENUSER,
        component: ScreenUsers
    },
]

export const ortherRouters: IRouter[] = [
    {
        title: 'Đăng nhập | admin',
        path: PATHNAME.SCREENDASHBOARD,
        component: ScreenLogin,
        isLayout: true,
    },
]