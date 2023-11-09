import { PATHNAME } from '../configs/pathname';
import { INavMenu } from './types';

export { default as DefaultLayout } from './default';

export const navMenu: INavMenu[] = [
    {
        id: 1,
        name: 'Bán hàng',
        icon: 'icon-shopping-cart-v2',
        link: PATHNAME.SCREENSALESCOUNTER
    },
    {
        id: 2,
        name: 'Trang chủ',
        icon: 'home-nav',
        link: PATHNAME.SCREENDASHBOARD
    },
    {
        id: 3,
        name: 'Đơn hàng',
        icon: 'order-nav',
        link: PATHNAME.SCREENORDERUSER,
        subMenu: [
            {
                name: 'Đơn hàng tại quầy',
                link: PATHNAME.SCREENORDERCOUNTERS,
                namePath: 'order',
            },
            {
                name: 'Đơn hàng online',
                link: PATHNAME.SCREENORDERUSER,
                namePath: 'order',
            },
        ]
    },
    {
        id: 4,
        name: 'Quản lý sản phẩm',
        icon: 'product-nav',
        link: PATHNAME.SCREENSETTINGPRODUCTS,
        subMenu: [
            {
                name: 'Sản phẩm',
                link: PATHNAME.SCREENSETTINGPRODUCTS,
                namePath: 'sp',
            },
            {
                name: 'Khuyến mãi',
                link: PATHNAME.SCREENSETTINGPROMMOTIONS,
                namePath: 'sp',
            }
        ]
    },
    {
        id: 5,
        name: 'Tài khoản',
        icon: 'customer-nav',
        link: PATHNAME.SCREENSTAFF,
        subMenu: [
            {
                name: 'Nhân viên',
                link: PATHNAME.SCREENSTAFF,
                namePath: 'staffs',
            },
            {
                name: 'Khách hàng',
                link: PATHNAME.SCREENUSER,
                namePath: 'users',
            }
        ]
    },
    {
        id: 6,
        name: 'Quảng cáo & thể loại',
        icon: 'icon-category',
        link: PATHNAME.SCREENSETTINGBANNERS,
        subMenu: [
            {
                name: 'Quảng cáo',
                link: PATHNAME.SCREENSETTINGBANNERS,
                namePath: 'bc',
            },
            {
                name: 'Thể loại',
                link: PATHNAME.SCREENSETTINGCATEGORIES,
                namePath: 'bc',
            }
        ]
    },
    {
        id: 7,
        name: 'Quản lý phân quyền',
        icon: 'icon-security',
        link: PATHNAME.SCREENDECENTRALIZATION,
        subMenu: [
            {
                name: 'Vai trò',
                link: PATHNAME.SCREENROLE,
                namePath: 'role',
            },
            {
                name: 'Phân quyền',
                link: PATHNAME.SCREENDECENTRALIZATION,
                namePath: 'role',
            }
        ]
    },
    {
        id: 8,
        name: 'Thiết lập',
        icon: 'settings-nav',
        link: PATHNAME.SCREENSETTINGS
    },

]