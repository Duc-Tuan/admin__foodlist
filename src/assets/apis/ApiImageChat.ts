import * as httpRequest from '../../store/axios';

const basePath: string = 'images';

const ApiImageChat = {
    async postImage(data: any) {
        try {
            const res = await httpRequest.post(`${basePath}`, data);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },

};

export default ApiImageChat;
