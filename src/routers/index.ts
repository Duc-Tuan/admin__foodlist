import { StatusOrder, StatusProduct, StatusUser } from "pages/status";
import { PATHNAME } from "../configs/pathname";
import { ScreenStaff, ScreenUsers } from "../pages/accounts";
import { ScreenInfoAccount } from "../pages/auth";
import { ScreenBanners, ScreenCategories } from "../pages/bannersAndCategories";
import { ScreenDashboard } from "../pages/dashboard";
import { ScreenCreateRole, ScreenDecentralization, ScreenRoles } from "../pages/decentralization/screen";
import { ScreenLogin } from "../pages/login";
import { ScreenOrderCounters, ScreenOrderUsers } from "../pages/orders/screen";
import { ScreenProducts, ScreenPrommtions } from "../pages/products";
import ScreenPrommotions from "../pages/prommotions";
import { ScreenSalesCounter } from "../pages/salesCounter";
import { ScreenLanguage } from "../pages/settings";
import ScreenSetting from "../pages/settings/screen";
import ScreenChat from "../pages/settings/screen/chat";
import ScreenInfoStore from "../pages/settings/screen/infoStore";
import ScreenNotifi from "../pages/settings/screen/notifi";
import ScreenPrint from "../pages/settings/screen/print";
import { ScreenWorks } from "../pages/works";
import { IRouter } from "./types";

export const privateRouters: IRouter[] = [
    {
        title: 'Dashboard | admin',
        path: PATHNAME.SCREENDASHBOARD,
        component: ScreenDashboard
    },
    {
        title: 'Đơn hàng khách đặt | admin',
        path: PATHNAME.SCREENORDERUSER,
        component: ScreenOrderUsers
    },
    {
        title: 'Đơn hàng bán tại quầy | admin',
        path: PATHNAME.SCREENORDERCOUNTERS,
        component: ScreenOrderCounters
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

        title: 'Hoạt động gần đây | admin',
        path: PATHNAME.SCREENWORK,
        component: ScreenWorks,
    },
    {

        title: 'Bán hàng tại quầy | admin',
        path: PATHNAME.SCREENSALESCOUNTER,
        component: ScreenSalesCounter,
        isDefaultSales: true,
    },
    {

        title: 'Vai trò | admin',
        path: PATHNAME.SCREENROLE,
        component: ScreenRoles,
        isDefaultSales: true,
    },
    {

        title: 'Thêm mới vai trò | admin',
        path: PATHNAME.SCREENDCREATEROLE,
        component: ScreenCreateRole,
        isDefaultSales: true,
    },
    {

        title: 'Phân quyền nhân viên | admin',
        path: PATHNAME.SCREENDECENTRALIZATION,
        component: ScreenDecentralization,
        isDefaultSales: true,
    },
    {

        title: 'Thiết lập | admin',
        path: PATHNAME.SCREENSETTINGS,
        component: ScreenSetting,
        isDefaultSales: true,
    },
    {

        title: 'Thiết lập cửa hàng | admin',
        path: PATHNAME.SCREENSETTINGSTORE,
        component: ScreenInfoStore,
        isDefaultSales: true,
    },
    {

        title: 'Thiết lập thông báo | admin',
        path: PATHNAME.SCREENSETTINGNOTIFI,
        component: ScreenNotifi,
        isDefaultSales: true,
    },
    {

        title: 'Thiết lập mẫu in | admin',
        path: PATHNAME.SCREENSETTINGPRINT,
        component: ScreenPrint,
        isDefaultSales: true,
    },
    {

        title: 'Thiết lập chat | admin',
        path: PATHNAME.SCREENSETTINGCHAT,
        component: ScreenChat,
        isDefaultSales: true,
    },
    {

        title: 'Thiết lập ngôn ngữ | admin',
        path: PATHNAME.SCREENSETTINGLANGUAGE,
        component: ScreenLanguage,
        isDefaultSales: true,
    },
    {

        title: 'Quản lý quảng cáo | admin',
        path: PATHNAME.SCREENSETTINGBANNERS,
        component: ScreenBanners,
        isDefaultSales: true,
    },
    {

        title: 'Quản lý thể loại | admin',
        path: PATHNAME.SCREENSETTINGCATEGORIES,
        component: ScreenCategories,
        isDefaultSales: true,
    },
    {

        title: 'Quản lý sản phẩm | admin',
        path: PATHNAME.SCREENSETTINGPRODUCTS,
        component: ScreenProducts,
        isDefaultSales: true,
    },
    {

        title: 'Quản lý khuyến mãi | admin',
        path: PATHNAME.SCREENSETTINGPROMMOTIONS,
        component: ScreenPrommtions,
        isDefaultSales: true,
    },
    {

        title: 'Quản lý trạng thái sản phẩm | admin',
        path: PATHNAME.SCREENSTATUSPRODUCT,
        component: StatusProduct,
        isDefaultSales: true,
    },
    {

        title: 'Quản lý trạng thái người dùng | admin',
        path: PATHNAME.SCREENSTATUSUSER,
        component: StatusUser,
        isDefaultSales: true,
    },
    {

        title: 'Quản lý trạng thái đơn hàng | admin',
        path: PATHNAME.SCREENSTATUSORDER,
        component: StatusOrder,
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