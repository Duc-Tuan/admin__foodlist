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
                name: 'Đơn hàng online',
                link: PATHNAME.SCREENORDERUSER,
                namePath: 'order',
            },
            {
                name: 'Đơn hàng tại quầy',
                link: PATHNAME.SCREENORDERCOUNTERS,
                namePath: 'order',
            },
        ]
    },
    {
        id: 4,
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
]