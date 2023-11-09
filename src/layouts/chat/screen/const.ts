import dayjs from "dayjs";
import avatar__user from '../../../assets/images/avatar__user.jpg';

export interface ISelectUser {
    id: string | number;
    name: string;
    image: string;
    date: string;
    contentNew: string;
}

export const dataUserChat: ISelectUser[] = [
    {
        id: 1,
        name: 'Phạm Đức Tuấn',
        image: avatar__user,
        date: "Tue Nov 07 2023 23:43:21 GMT+0700 (Indochina Time)",
        contentNew: 'Nhìn cái méo gì không biết nữa',
    },
    {
        id: 2,
        name: 'Mr.Tuan',
        image: avatar__user,
        date: "Tue Nov 06 2023 23:43:21 GMT+0700 (Indochina Time)",
        contentNew: 'Nhìn cái con củ...',
    },
    {
        id: 3,
        name: 'Mr.John',
        image: avatar__user,
        date: "Th Oct 26 2023 16:49:39 GMT+0700 (Indochina Time) ",
        contentNew: 'Cút',
    },
]

export interface IMessager {
    id: number | string;
    senderId: number | string;
    receiverId: number | string;
    content: string;
    date: string;
}

export const fakeDataMessage: IMessager[] = [
    {
        id: 1,
        senderId: 2222,
        receiverId: 11,
        content: "mmmmmmmmmm",
        date: "Wed Oct 25 2023 16:49:39 GMT+0700 (Indochina Time) ",
    },
    {
        id: 2,
        senderId: 11,
        receiverId: 2222,
        content: "aaaaaa",
        date: "Wed Oct 25 2023 16:49:39 GMT+0700 (Indochina Time) ",
    },
    {
        id: 3,
        senderId: 11,
        receiverId: 11,
        content: "bbbb",
        date: "Wed Oct 25 2023 16:49:39 GMT+0700 (Indochina Time) ",
    },
    {
        id: 4,
        senderId: 2222,
        receiverId: 11,
        content: "lượn ngay",
        date: "Wed Oct 25 2023 16:49:39 GMT+0700 (Indochina Time) ",
    },
    {
        id: 5,
        senderId: 2222,
        receiverId: 11,
        content: "Nhắn cái cc Nhắn cái cc",
        date: "Wed Oct 25 2023 16:49:39 GMT+0700 (Indochina Time) ",
    },
    {
        id: 6,
        senderId: 11,
        receiverId: 2222,
        content: "aaaaaa",
        date: "Wed Oct 25 2023 16:49:39 GMT+0700 (Indochina Time) ",
    },
    {
        id: 7,
        senderId: 11,
        receiverId: 11,
        content: "bbbb",
        date: "Wed Oct 25 2023 16:49:39 GMT+0700 (Indochina Time) ",
    },
    {
        id: 8,
        senderId: 2222,
        receiverId: 11,
        content: "lượn ngay",
        date: "Tue Nov 07 2023 23:43:21 GMT+0700 (Indochina Time)",
    },
    {
        id: 9,
        senderId: 11,
        receiverId: 2222,
        content: "aaaaaa",
        date: "Tue Nov 07 2023 23:43:21 GMT+0700 (Indochina Time)",
    },
    {
        id: 10,
        senderId: 11,
        receiverId: 11,
        content: "bbbb",
        date: "Tue Nov 07 2023 23:43:21 GMT+0700 (Indochina Time)",
    },
    {
        id: 11,
        senderId: 2222,
        receiverId: 11,
        content: "lượn ngay",
        date: "Tue Nov 07 2023 23:43:21 GMT+0700 (Indochina Time)",
    }
]
export const fakeDataMessage2: IMessager[] = [
    {
        id: 1,
        senderId: 2222,
        receiverId: 11,
        content: "mmmmmmmmmm 1",
        date: "Wed Oct 24 2023 16:49:39 GMT+0700 (Indochina Time) ",
    },
    {
        id: 2,
        senderId: 11,
        receiverId: 2222,
        content: "aaaaaa 2",
        date: "Wed Oct 24 2023 16:49:39 GMT+0700 (Indochina Time) ",
    },
    {
        id: 3,
        senderId: 11,
        receiverId: 11,
        content: "bbbb 3",
        date: "Wed Oct 24 2023 16:49:39 GMT+0700 (Indochina Time) ",
    }, {
        id: 4,
        senderId: 2222,
        receiverId: 11,
        content: "lượn ngay",
        date: "Wed Oct 24 2023 16:49:39 GMT+0700 (Indochina Time) ",
    },
    {
        id: 5,
        senderId: 2222,
        receiverId: 11,
        content: "Nhắn cái cc Nhắn cái cc",
        date: "Wed Oct 24 2023 16:49:39 GMT+0700 (Indochina Time) ",
    },
]


export const dataUser = {
    id: 2222,
    name: 'Admin',
}

export const dateTimeMess = (data: string) => {
    if (dayjs().isSame(data, 'day')) {
        return 'Hôm nay';
    } else if (dayjs(data).isSame(dayjs().subtract(1, 'day'), 'day')) {
        return 'Hôm qua';
    } else {
        return dayjs(data).format('DD/MM/YYYY');
    }
};