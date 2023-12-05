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
        id: '651fa7a8009e2784634b5329',
        name: 'Phạm Đức Tuấn',
        image: avatar__user,
        date: "Tue Nov 07 2023 23:43:21 GMT+0700 (Indochina Time)",
        contentNew: 'Nhìn cái méo gì không biết nữa',
    },
    {
        id: "1234234234",
        name: 'Mr.John',
        image: avatar__user,
        date: "Th Oct 26 2023 16:49:39 GMT+0700 (Indochina Time) ",
        contentNew: 'Cút',
    },
]

export interface IMessager {
    zoom?: number | string;
    senderId?: number | string;
    receiverId?: number | string;
    content?: string;
    date: string;
}

export const fakeDataMessage: IMessager[] = [
    {
        zoom: '651fa7a8009e2784634b5329',
        senderId: '651fa7a8009e2784634b5329',
        receiverId: '650bbb2315c0e10c0ed839d9',
        content: "mmmmmmmmmm",
        date: "Wed Oct 25 2023 16:49:39 GMT+0700 (Indochina Time) ",
    },
    {
        zoom: '651fa7a8009e2784634b5329',
        senderId: '650bbb2315c0e10c0ed839d9',
        receiverId: '651fa7a8009e2784634b5329',
        content: "aaaaaa",
        date: "Wed Oct 25 2023 16:49:39 GMT+0700 (Indochina Time) ",
    },
    {
        zoom: '651fa7a8009e2784634b5329',
        senderId: '650bbb2315c0e10c0ed839d9',
        receiverId: '650bbb2315c0e10c0ed839d9',
        content: "bbbb",
        date: "Wed Oct 25 2023 16:49:39 GMT+0700 (Indochina Time) ",
    },
    {
        zoom: '651fa7a8009e2784634b5329',
        senderId: '651fa7a8009e2784634b5329',
        receiverId: '650bbb2315c0e10c0ed839d9',
        content: "lượn ngay",
        date: "Wed Oct 25 2023 16:49:39 GMT+0700 (Indochina Time) ",
    },
    {
        zoom: '651fa7a8009e2784634b5329',
        senderId: '651fa7a8009e2784634b5329',
        receiverId: '650bbb2315c0e10c0ed839d9',
        content: "Nhắn cái cc Nhắn cái cc",
        date: "Wed Oct 25 2023 16:49:39 GMT+0700 (Indochina Time) ",
    },

]
export const fakeDataMessage2: IMessager[] = [
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