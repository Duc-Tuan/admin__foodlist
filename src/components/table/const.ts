export interface IAction {
    title: string;
    callback: (id: number, flag?: boolean) => void;
    icon: JSX.Element;
    icon2?: JSX.Element;
    type?: 'view_detail' | 'common';
    subTitle?: string | React.ReactNode;
}

export interface PaginationModel {
    name: string;
    displayNumber: number;
    page: number;
    sizeLimit?: number;
    limit?: number;
    totalPage: number;
    totalItem: number;
    setPage: (page: number) => void;
    chooseSizeLimit?: (limit: number) => void;
    isChooseSizeLimit?: boolean;
    styles?: React.CSSProperties;
}
