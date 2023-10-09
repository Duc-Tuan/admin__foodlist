import { PATHNAME } from '../configs/pathname';
import { INavMenu } from './types';

export { default as DefaultLayout } from './default';

export const navMenu: INavMenu[] = [
    {
        id: 1,
        name: 'Trang chủ',
        icon: 'home-nav',
        link: PATHNAME.SCREENDASHBOARD
    },
    {
        id: 2,
        name: 'Đơn hàng',
        icon: 'order-nav',
        link: PATHNAME.SCREENORDER,
        subMenu: [
            {
                name: 'Đơn hàng',
                link: PATHNAME.SCREENORDER,
                namePath: 'orders',
            }
        ]
    },
    {
        id: 3,
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