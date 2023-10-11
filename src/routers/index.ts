import { PATHNAME } from "../configs/pathname";
import { ScreenStaff, ScreenUsers } from "../pages/accounts";
import { ScreenInfoAccount } from "../pages/auth";
import { ScreenDashboard } from "../pages/dashboard";
import { ScreenLogin } from "../pages/login";
import { ScreenOrders } from "../pages/orders";
import ScreenPrommotions from "../pages/prommotions";
import { ScreenSalesCounter } from "../pages/salesCounter";
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
    {
        title: 'Thông tin tài khoản của bạn | admin',
        path: PATHNAME.SCREENINFOUSER,
        component: ScreenInfoAccount
    },
    {

        title: 'Bán hàng tại quầy | admin',
        path: PATHNAME.SCREENSALESCOUNTER,
        component: ScreenSalesCounter,
        isDefaultSales: true,
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