import { Option } from "../../../../../types/general";

export interface IDecentralization extends Option {
    children: Option[]
}

export const dataDecentralization: IDecentralization[] = [
    {
        value: 'Dashboard',
        label: 'Tổng quan',
        children: [
            {
                label: 'Xem màn tổng quan',
                value: 'VIEWDASHBOARD',
            }
        ]
    },
    {
        value: 'SalesCounter',
        label: 'Bán hàng',
        children: [
            {
                label: 'Bán hàng tại quầy',
                value: 'VIEWSALESCOUNTER',
            }
        ]
    },
    {
        value: 'OrderCounters',
        label: 'Đơn hàng tại quầy',
        children: [
            {
                label: 'Xem đơn hàng tại quầy',
                value: 'VIEWORDERCOUNTERS',
            },
            {
                label: 'Sửa đơn hàng tại quầy',
                value: 'EDITORDERCOUNTERS',
            },
            {
                label: 'Xóa đơn hàng tại quầy',
                value: 'DELETEOEDERCOUNTERS',
            },
        ]
    },
    {
        value: 'OrderOnline',
        label: 'Đơn hàng online',
        children: [
            {
                label: 'Xem đơn hàng online',
                value: 'VIEWORDERONLINE',
            },
            {
                label: 'Sửa đơn hàng online',
                value: 'EDITWORDERONLINE',
            },
            {
                label: 'Xóa đơn hàng online',
                value: 'DELETEORDERONLINE',
            },
        ]
    },
    {
        value: 'Product',
        label: 'Sản phẩm',
        children: [
            {
                label: 'Xem sản phẩm',
                value: 'VIEWPRODUCTS',
            },
            {
                label: 'Thêm sản phẩm',
                value: 'CREATEPRODUCTS',
            },
            {
                label: 'Sửa sản phẩm',
                value: 'EDITPRODUCTS',
            },
            {
                label: 'Xóa sản phẩm',
                value: 'DELETEPRODUCTS',
            },
        ]
    },
    {
        value: 'Prommotion',
        label: 'Khuyến mãi',
        children: [
            {
                label: 'Xem khuyến mãi',
                value: 'VIEWPROMMOTIONS',
            },
            {
                label: 'Thêm khuyến mãi',
                value: 'CREATEPROMMOTIONS',
            },
            {
                label: 'Sửa khuyến mãi',
                value: 'EDITPROMMOTIONS',
            },
            {
                label: 'Xóa khuyến mãi',
                value: 'DELETEPROMMOTIONS',
            },
        ]
    },
    {
        value: 'AccountsStaff',
        label: 'Tài khoản nhân viên',
        children: [
            {
                label: 'Xem tài khoản nhân viên',
                value: 'VIEWPACCOUNTSTAFF',
            },
            {
                label: 'Thêm tài khoản nhân viên',
                value: 'CREATEPACCOUNTSTAFF',
            },
            {
                label: 'Sửa tài khoản nhân viên',
                value: 'EDITPACCOUNTSTAFF',
            },
            {
                label: 'Xóa tài khoản nhân viên',
                value: 'DELETEPACCOUNTSTAFF',
            },
        ]
    },
    {
        value: 'AccountsUser',
        label: 'Tài khoản khách hàng',
        children: [
            {
                label: 'Xem tài khoản khách hàng',
                value: 'VIEWPACCOUNTUSER',
            },
            {
                label: 'Thêm tài khoản khách hàng',
                value: 'CREATEPACCOUNTUSER',
            },
            {
                label: 'Sửa tài khoản khách hàng',
                value: 'EDITPACCOUNTUSER',
            },
            {
                label: 'Xóa tài khoản khách hàng',
                value: 'DELETEPACCOUNTUSER',
            },
        ]
    },
    {
        value: 'Banner',
        label: 'Quảng cáo',
        children: [
            {
                label: 'Xem quảng cáo',
                value: 'VIEWBANNERS',
            },
            {
                label: 'Thêm quảng cáo',
                value: 'CREATEBANNERS',
            },
            {
                label: 'Sửa quảng cáo',
                value: 'EDITBANNERS',
            },
            {
                label: 'Xóa quảng cáo',
                value: 'DELETEBANNERS',
            },
        ]
    },
    {
        value: 'Categories',
        label: 'Thể loại',
        children: [
            {
                label: 'Xem thể loại',
                value: 'VIEWPCATEGORY',
            },
            {
                label: 'Thêm thể loại',
                value: 'CREATEPCATEGORY',
            },
            {
                label: 'Sửa thể loại',
                value: 'EDITPCATEGORY',
            },
            {
                label: 'Xóa thể loại',
                value: 'DELETEPCATEGORY',
            },
        ]
    },
    {
        value: 'Decentralization',
        label: 'Phân quyền & vai trò',
        children: [
            {
                label: 'Xem phân quyền',
                value: 'VIEWDECENTRALIZATION',
            },
            {
                label: 'Thêm phân quyền',
                value: 'CREATEDECENTRALIZATION',
            },
            {
                label: 'Sửa phân quyền',
                value: 'EDITDECENTRALIZATION',
            },
            {
                label: 'Xóa phân quyền',
                value: 'DELETEDECENTRALIZATION',
            },
        ]
    },
    {
        value: 'Settings',
        label: 'Thiết lập',
        children: [
            {
                label: 'Xem thông tin cửa hàng',
                value: 'VIEWSTORE',
            },
            {
                label: 'Sửa thông tin cửa hàng',
                value: 'EDITSTORE',
            },
            {
                label: 'Xem mẫu in',
                value: 'VIEWPRINT',
            },
            {
                label: 'Sửa mẫu in',
                value: 'EDITPRINT',
            },
            {
                label: 'Xóa mẫu in',
                value: 'DELETEPRINT',
            },
            {
                label: 'Thiết lập tin nhắn',
                value: 'SETTINGMESSAGER',
            },
            {
                label: 'Thiết lập thông báo',
                value: 'SETTINGNOTIFITION',
            },
        ]
    },
]