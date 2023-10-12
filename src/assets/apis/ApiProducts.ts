import * as httpRequest from '../../store/axios';

const basePath: string = 'products';

const ApiProducts = {
    async getProducts(page?: number, pageSize?: number, query?: string, categoryId?: string | number) {
        try {
            const res = await httpRequest.get(`${basePath}`, {
                params: {
                    page,
                    pageSize,
                    query,
                    categoryId
                },
            });
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },

    async getProductsLike(ids?: string[], page?: number, pageSize?: number, query?: string) {
        try {
            if (ids) {
                const res = await httpRequest.post(`${basePath}/user-like`, {
                    body: {
                        ids
                    },
                    params: {
                        page,
                        pageSize,
                        query
                    },
                });
                return res;
            } return [];
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },

    async getDetailProduct(id?: string | number) {
        try {
            const res = await httpRequest.get(`${basePath}/${id}`);
            return res;
        } catch (error: any) {
            const { message, status } = error || {};
            return Promise.reject({ status: status, message: message ?? 'Đã có lỗi xảy ra!' });
        }
    },
};

export default ApiProducts;
