import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../../../assets/icon';
import { Button, Table } from '../../../../components';
import { PaginationModel } from '../../../../components/table/const';
import { DefaultLayout } from '../../../../layouts';
import { TableConfigs } from '../../../../types/general';
import { formatCurrency } from '../../../../utils';
import { IProducts, dataProducts } from './const';
import './index.scss';

const Index = () => {
  const { t } = useTranslation();
  const handleSearch = (data: string) => {};
  const [pagination, setPagination] = React.useState<PaginationModel>({
    name: 'Sản phẩm',
    displayNumber: 3,
    page: 1,
    sizeLimit: 20,
    totalPage: 1,
    totalItem: 1,
    setPage: (page) => {
      handleChangePage(page);
    },
    chooseSizeLimit: (limit) => {
      handleChangeSizeLimit(limit);
    },
  });
  const [tableConfigs, setTableConfigs] = React.useState<TableConfigs>({
    titles: ['STT', 'Mã', 'Tên sản phẩm', 'Giá tiền', 'Nguồn hàng', 'Trạng thái'],
    formats: ['text-center', 'text-left', 'text-left', 'text-right', 'text-center', 'text-center'],
    sizes: [60, 100, 600, 200, 200, 200],
    shows: [true, true, true, true, true, true],
  });

  const handleChangePage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };
  const handleChangeSizeLimit = (limit: number) => {
    setPagination((prev) => ({ ...prev, sizeLimit: limit }));
  };

  const reactNodeRight = [
    <Button color="primary">
      <Icon name="plus-circle" /> {t('Thêm mới')}
    </Button>,
  ];

  const dataMappingArray = (item: IProducts, idx?: number) => {
    const common = [
      {
        title: 'STT',
        data: idx,
        show: true,
        size: 60,
      },
      {
        title: 'Mã',
        data: item?.code,
        show: true,
        size: 100,
      },
      {
        title: 'Tên sản phẩm',
        data: item?.name,
        show: true,
        size: 600,
      },
      {
        title: 'Giá tiền',
        data: formatCurrency(item?.price, ''),
        show: true,
        size: 200,
      },
      {
        title: 'Nguồn hàng',
        data: item?.source,
        show: true,
        size: 100,
      },
      {
        title: 'Trạng thái',
        data: item?.source,
        show: true,
        size: 100,
      },
    ];

    return common;
  };

  const renderDetail = (data: any) => {
    return <div className="wrapper__tippy--viewDetail">aaa</div>;
  };

  return (
    <DefaultLayout
      title="Sản phẩm"
      placeholder="Tìm kiếm theo tên, mã sản phẩm..."
      onChange={handleSearch}
      isBack
      reactNodeRight={reactNodeRight}
      noBack
    >
      <Table
        items={dataProducts}
        name="Danh sách sản phẩm"
        shows={tableConfigs?.shows}
        formats={tableConfigs?.formats}
        sizes={tableConfigs?.sizes}
        titles={tableConfigs?.titles}
        dataMappingArray={(item, idx) => dataMappingArray(item, idx)}
        hasViewDetail
        isPagination
        isEditColumns
        renderDetail={(detail: any) => renderDetail(detail)}
        dataPagination={pagination}
      />
    </DefaultLayout>
  );
};

export default Index;
