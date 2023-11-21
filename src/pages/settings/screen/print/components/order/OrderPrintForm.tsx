import React from 'react';
import BarcodeImage from 'assets/images/barcode-image.png';
import StoreLogoSample from 'assets/images/logo.png';

import './OrderPrintForm.scss';
import { SizePrintA4 } from '../SizeForms';
import { useTranslation } from 'react-i18next';

type Props = {
  order?: any;
  view?: boolean;
  html?: string;
  size?: 'A4' | 'A5' | 'K80' | 'K58';
  isDefaultView?: boolean;
  isTest?: boolean;
};

const OrderPrintForm = React.forwardRef((props: Props, ref: any) => {
  const { html, order, size, view, isDefaultView, isTest = false } = props;

  let renderTemplate = (templateData: string) => {
    let template = templateData;
    template = template.replaceAll('{store_name}', 'Food chef');
    template = template.replaceAll('{store_tax_code}', 'ST005024');
    template = template.replaceAll('{store_phone}', '0123456789');
    template = template.replaceAll('{location_name}', 'Lê Đức Thọ');
    template = template.replaceAll('{location_phone}', '0376600555');
    template = template.replaceAll('{location_email}', 'anbinh@iris.com');
    template = template.replaceAll('{location_phone}', '0376600555');
    template = template.replaceAll('{location_email}', 'anbinh@iris.com');
    template = template.replaceAll('{location_address}', '35 Nguyễn Đình Chiểu');
    template = template.replaceAll('{location_ward}', '40 Chính Kinh');
    template = template.replaceAll('{location_district}', 'Thanh Xuân');
    template = template.replaceAll('{location_province}', 'TP Hà Nội');
    template = template.replaceAll('{store_business_code}', 'STB00120043');
    template = template.replaceAll('{store_business_code_issued_at}', 'Ngày 21 tháng 04 năm 2023');
    template = template.replaceAll('{store_address}', '35 Nguyễn Đình Chiểu');
    template = template.replaceAll('{store_ward}', 'phường Lê Đại Hành');
    template = template.replaceAll('{store_district}', 'quận Hai Bà Trưng');
    template = template.replaceAll('{store_province}', 'TP Hà Nội');
    template = template.replaceAll('{store_email}', 'iris@gmail.com');

    template = template.replaceAll(
      '{store_logo}',
      `<div style="height: 6rem;width:15rem;"><img style="width:100%; " src=${StoreLogoSample} /></div>`,
    );
    template = template.replaceAll('{sys_date}', '20/03/2023');
    template = template.replaceAll('{sys_date_text}', 'Ngày 20 tháng 03 năm 2023');
    template = template.replaceAll('{created_by_name}', 'Vũ Thành Tâm');
    template = template.replaceAll('{created_at}', '20/03/2023');
    template = template.replaceAll('{created_at_text}', 'Ngày 20 tháng 03 năm 2023');
    template = template.replaceAll('{created_by_name}', 'Vũ Thành Tâm');
    template = template.replaceAll('{updated_at}', '21/03/2023');

    template = template.replaceAll('{customer_name}', 'Nguyễn Thành An');
    template = template.replaceAll('{customer_phone}', '0376600234');
    template = template.replaceAll('{customer_email}', 'customer@iris.com');
    template = template.replaceAll('{customer_group_name}', 'Khách hàng quận Thanh Xuân');
    template = template.replaceAll('{customer_email}', 'customer@iris.com');
    template = template.replaceAll('{customer_code}', 'KH000564');
    template = template.replaceAll('{customer_group_name}', 'Khách hàng quận Thanh Xuân');
    template = template.replaceAll('{customer_address}', '79 Tân Thành, Tân Phú, TP HCM');
    template = template.replaceAll('{customer_ward}', '79 Tân Thành');
    template = template.replaceAll('{customer_district}', 'Tân Phú');
    template = template.replaceAll('{customer_province}', 'TP HCM');
    template = template.replaceAll('{customer_debt}', '200,000');
    template = template.replaceAll('{customer_debt_text}', 'Hai trăm nghìn đồng.');
    template = template.replaceAll('{order_status}', 'Hoàn Thành');
    template = template.replaceAll('{fulfillment_status}', 'Hủy / Nhận lại hàng');
    template = template.replaceAll('{order_code}', 'DH002500');
    template = template.replaceAll('{order_code_qr}', 'DH002500');
    template = template.replaceAll('{order_source}', 'Bán tại quầy');
    template = template.replaceAll(
      '{order_code_barcode}',
      `<img style="width:14rem; height:100%; " src="${BarcodeImage}" />`,
    );
    template = template.replaceAll('{payment_status}', 'Đã thanh toán');
    template = template.replaceAll('{promotion_name}', 'Khuyến mãi 50k');
    template = template.replaceAll('{promotion_code}', 'KM00050');
    template = template.replaceAll('{note}', 'Đơn hàng đến từ IRIS');
    template = template.replaceAll('{payment_method}', 'MOMO');
    template = template.replaceAll('{sub_total}', '3,500,000');
    template = template.replaceAll('{total_discount}', '250,000');
    template = template.replaceAll('{total}', '3,250,000');
    template = template.replaceAll('{total_text}', 'Ba triệu hai trăm năm mươi nghìn đồng.');
    template = template.replaceAll('{pay_received}', '4,000,000');
    template = template.replaceAll('{change_money}', '750,000');
    template = template.replaceAll('{stt}', '1');
    template = template.replaceAll('{sku}', 'SKU00050');
    template = template.replaceAll('{name}', 'Viên uống Active Legs Nordic');
    template = template.replaceAll('{unit}', 'Hộp');
    template = template.replaceAll('{quantity}', '7');
    template = template.replaceAll('{price_before}', '500,000');
    template = template.replaceAll('{price_after}', '500,000');
    template = template.replaceAll('{total}', '3,500,000');
    template = template.replaceAll('{total_discount}', '250,000');
    template = template.replaceAll('{note}', 'Sản phẩm uống buổi sáng');
    template = template.replaceAll('{image}', '');
    template = template.replaceAll('{description}', 'Đơn hàng từ IRIS');
    template = template.replaceAll('{barcode}', 'SP000125');
    template = template.replaceAll('{product_group}', 'Thực phẩm chức năng');

    return template;
  };

  const renderHTML = () => {
    if (isDefaultView) return html;
    if (!isDefaultView && isTest) return renderTemplate(html ?? '');
  };

  return (
    <div className="wrapper__OrderPrintForm">
      <div ref={ref} className="config-print-form order-print-form">
        <SizePrintA4 template={renderHTML()} />
        {/* {size === sizeObjPrints.K80 && <SizePrintK80 template={renderHTML()} />} */}
      </div>
    </div>
  );
});

export default OrderPrintForm;
