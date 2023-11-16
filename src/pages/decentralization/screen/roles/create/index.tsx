import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../../../assets/icon';
import { Button, InputCompDev } from '../../../../../components';
import { PATHNAME } from '../../../../../configs/pathname';
import { DefaultLayout } from '../../../../../layouts';
import './index.scss';
import { useForm } from 'react-hook-form';
import { IDecentralization, dataDecentralization } from './const';
import { Option } from '../../../../../types/general';
import Checkbox from '../../../../../components/checkboxTabel/checkbox';
import { cloneDeep } from 'lodash';
import { useBoolean, useToast } from 'hooks';

type Props = {};

const ScreenCreateRole = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const [selected, setSelected] = React.useState<string[]>([]);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = handleSubmit(async (data: any) => {
    console.log(data);
    if (selected?.length === 0) {
    }
  });

  const reactNodeRight = [
    <Button color="primary" variant="outline">
      <Icon name="times" /> {t('Hủy')}
    </Button>,
    <Button color="primary" onClick={onSubmit}>
      <Icon name="document" /> {t('Lưu')}
    </Button>,
  ];

  const handleCheck = (isCheck: any, data: any, type: string) => {
    const newArray = cloneDeep(selected);
    if (type === 'parent') {
      const { children } = data;
      const dataChildren = children?.map((i: Option) => i?.value);
      if (isCheck) {
        const dataNew: string[] = cloneDeep(selected);
        dataChildren?.map((d: string) => {
          const is = dataNew?.find((p: string) => p === d);
          if (!is) return dataNew.push(d);
        });
        return setSelected([...dataNew]);
      } else {
        const dataNew: string[] = [];
        newArray?.map((d: string) => {
          const is = dataChildren?.find((p: string) => p === d);
          return !is && dataNew.push(d);
        });
        return setSelected([...dataNew]);
      }
    } else if (type === 'children') {
      if (isCheck) {
        return setSelected([...newArray, data?.value]);
      } else {
        const dataNew: string[] = [];
        newArray?.map((d: string) => {
          return !(data?.value === d) && dataNew.push(d);
        });
        return setSelected([...dataNew]);
      }
    }
  };

  return (
    <DefaultLayout
      title="Thêm mới vai trò"
      isBack
      isSearch
      reactNodeRight={reactNodeRight}
      onClickBack={() => navigate(PATHNAME.SCREENROLE)}
    >
      <div className="wrapper__createRoles">
        <InputCompDev
          label="Tên vai trò"
          placeholder="Full quyền"
          required
          inputProps={{ ...register('name', { required: true }) }}
          errors={errors.name?.message === '' ? true : false}
          messErrors="Không được để trống tên vai trò!"
        />

        <section className="manganer">
          <label htmlFor="">{t('Phân quyền')}</label>
          <main>
            {dataDecentralization.map((i: IDecentralization, idx: number) => {
              const { children, label, value } = i;
              const isCheckedAll = children?.map((s: Option) => {
                return selected?.some((c: string) => c === s?.value);
              });
              return (
                <Item
                  data={i}
                  children={children}
                  handleCheck={handleCheck}
                  isCheckedAll={isCheckedAll}
                  label={label}
                  selected={selected}
                  key={`key-roles-${idx}`}
                />
              );
            })}
          </main>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default ScreenCreateRole;

interface IItem {
  data: any;
  isCheckedAll: any;
  label: any;
  handleCheck: any;
  children: any;
  selected: string[];
}

const Item = (props: IItem) => {
  const { data, isCheckedAll, label, handleCheck, children, selected } = props;
  const [show, { on, off, toggle }] = useBoolean(true);
  return (
    <div className="manganer__item" style={{ height: show ? '100%' : '44px' }}>
      <div className="manganer__item--header p-10 d-flex justify-content-between align-items-center gap-10">
        <Checkbox
          checked={isCheckedAll?.some((ck: boolean) => ck === false) ? false : true}
          label={label}
          onChange={(e: any) => handleCheck(e?.target?.checked, data, 'parent')}
        />

        <div className="icon d-flex justify-content-end align-items-center" onClick={toggle}>
          <Icon name="chevron-down" className={`${show ? 'on' : 'off'}`} />
        </div>
      </div>
      <div className="manganer__item--subMenu p-10-20">
        {children?.map((d: Option, idx: number) => {
          return (
            <div className="subMenu__children p-6 d-flex justify-content-start align-items-center gap-10" key={idx}>
              <Checkbox
                checked={selected?.some((s: string) => s === d?.value)}
                label={d?.label}
                onChange={(e: any) => handleCheck(e?.target?.checked, d, 'children')}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
