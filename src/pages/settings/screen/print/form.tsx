import { formatVietnameseCurrency } from 'utils';

export const dataFormDefalut: () => string = () => {
  return `<div style="padding: 2rem">
    <div style="display: flex; justify-content: flex-start; align-items: center; gap: 10px">
        {store_logo}
        <div>
            <div style="font-size: 1.4rem">Cửa hàng: {store_name}</div>
            <div style="font-size: 1.4rem">Địa chỉ: {location_address}, {location_ward}, {location_district}, {location_province}</div>
            <div style="font-size: 1.4rem">Số điện thoại: {store_phone}</div>
        </div>
        <div>
            <div>{order_code_barcode}</div>
            <div style="text-align: center; font-size: 1.2rem">{order_code}</div>
        </div>
    </div>

    <h2 style="text-align: center; font-weight: bold; margin-top: 4rem">HÓA ĐƠN BÁN HÀNG</h2>
    <h5 style="text-align: center;margin-top: 0.3rem">{order_code}</h5>
    <h5 style="text-align: center;margin-top: 0.3rem">{sys_date_text}</h5>

    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; margin-top: 3rem">
        <div>
            <div style="font-size: 1.4rem">Khách hàng: {customer_name}</div>
            <div style="font-size: 1.4rem">Địa chỉ: {customer_address}, {customer_ward}, {customer_district}, {customer_province}</div>
            <div style="font-size: 1.4rem">Số điện thoại: {customer_phone}</div>
        </div>
        <div style="width: 28rem">
            <div style="font-size: 1.4rem">Thanh toán: {payment_method}</div>
            <div style="font-size: 1.4rem">NVBH: {created_by_name}</div>
            <div style="font-size: 1.4rem">Ngày bán: {created_at}</div>
        </div>
    </div>
    
    <div style="width: 100%;display: table;border: 0.1rem solid #cccccc;margin-top: 2rem">
        <div style="display: table-row">
            <div style="display: table-cell;text-align:center;padding:8px;border-right: 0.1rem solid #CCCCCC;border-bottom: 0.1rem solid #CCCCCC" >STT</div>
            <div style="font-weight:600; display: table-cell;text-align:left;padding:8px;border-right: 0.1rem solid #CCCCCC;border-bottom: 0.1rem solid #CCCCCC;font-size: 1.4rem; white-space: nowrap" >Tên sản phẩm</div>
            <div style="font-weight:600; display: table-cell;text-align:center;padding:8px;border-right: 0.1rem solid #CCCCCC;border-bottom: 0.1rem solid #CCCCCC;font-size: 1.4rem;  white-space: nowrap" >Đơn vị</div>
            <div style="font-weight:600; display: table-cell;text-align:center;padding:8px;border-right: 0.1rem solid #CCCCCC;border-bottom: 0.1rem solid #CCCCCC;font-size: 1.4rem;  white-space: nowrap" >SL</div>
            <div style="font-weight:600; display: table-cell;text-align:right;padding:8px;border-right: 0.1rem solid #CCCCCC;border-bottom: 0.1rem solid #CCCCCC;font-size: 1.4rem;  white-space: nowrap" >Giá trả </div>
            <div style="font-weight:600; display: table-cell;text-align:right;padding:8px;border-bottom: 0.1rem solid #CCCCCC;font-size: 1.4rem;white-space: nowrap" >Thành tiền</div>
        </div>

        <div style="display: table-row">
            <div style="display:table-cell;text-align:center;padding:8px;border-right: 0.1rem solid #CCCCCC;border-bottom: 0.1rem solid #CCCCCC;font-size: 1.4rem">{stt}</div>
            <div style=" display: table-cell;text-align:left;padding:8px;border-right: 0.1rem solid #CCCCCC;border-bottom: 0.1rem solid #CCCCCC;font-size: 1.4rem" >{name}</div>
            <div style=" display: table-cell;text-align:center;padding:8px;border-right: 0.1rem solid #CCCCCC;border-bottom: 0.1rem solid #CCCCCC;font-size: 1.4rem" >{unit}</div>
            <div style=" display: table-cell;text-align:center;padding:8px;border-right: 0.1rem solid #CCCCCC;border-bottom: 0.1rem solid #CCCCCC;font-size: 1.4rem">{quantity}</div>
            <div style=" display: table-cell;text-align:right;padding:8px;border-right: 0.1rem solid #CCCCCC;border-bottom: 0.1rem solid #CCCCCC;font-size: 1.4rem">{price_after}</div>
            <div style="display: table-cell;text-align:right;padding:8px;border-bottom: 0.1rem solid #CCCCCC;" >{total}</div>
        </div>
        <div style="display: table-row">
            <div style="display:table-cell;text-align:center;padding:8px;border-right: 0.1rem solid #CCCCCC;border-bottom: 0.1rem solid #CCCCCC;font-size: 1.4rem">{stt}</div>
            <div style=" display: table-cell;text-align:left;padding:8px;border-right: 0.1rem solid #CCCCCC;border-bottom: 0.1rem solid #CCCCCC;font-size: 1.4rem" >{name}</div>
            <div style=" display: table-cell;text-align:center;padding:8px;border-right: 0.1rem solid #CCCCCC;border-bottom: 0.1rem solid #CCCCCC;font-size: 1.4rem" >{unit}</div>
            <div style=" display: table-cell;text-align:center;padding:8px;border-right: 0.1rem solid #CCCCCC;border-bottom: 0.1rem solid #CCCCCC;font-size: 1.4rem">{quantity}</div>
            <div style=" display: table-cell;text-align:right;padding:8px;border-right: 0.1rem solid #CCCCCC;border-bottom: 0.1rem solid #CCCCCC;font-size: 1.4rem">{price_after}</div>
            <div style="display: table-cell;text-align:right;padding:8px;border-bottom: 0.1rem solid #CCCCCC;" >{total}</div>
        </div>
   </div>

   <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; margin-top: 1rem;font-size: 1.5rem">
        <div>Tổng tiền hàng</div>
        <div>{sub_total}</div>
   </div>
   <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem;font-size: 1.5rem">
        <div>Chương trình khuyến mãi</div>
        <div>{total_discount}</div>
   </div>
   <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem;font-size: 1.5rem;font-weight:600">
        <div>Thành tiền</div>
        <div>{total}</div>
   </div>
   <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem;font-size: 1.5rem">
        <div>Khách thanh toán</div>
        <div>{total}</div>
   </div>
   <div>
    <div style="color:#000;font-size:1.5rem;font-weight:400;line-height:1.5rem; float: right"><i>Bằng chữ: ${formatVietnameseCurrency(3250000)}</i></div>
   </div>

    <div style="color:#000;font-size:1.3rem;font-weight:400;line-height:1.5rem; text-align: center; margin-top: 4rem"><i>Cảm ơn quý khách và hẹn gặp lại!</i></div>
</div>`;
};
