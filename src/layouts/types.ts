export interface INavMenu {
    id: number,
    name: string,
    icon: string,
    link: string,
    subMenu?: ISubMenu[];
}

export interface ISubMenu {
    name: string,
    link: string,
    namePath?: string,
}