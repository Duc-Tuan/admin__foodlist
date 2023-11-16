import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import './index.scss';

import Button from '../button';
import Icon from '../../assets/icon';
import { useTranslation } from 'react-i18next';
import Checkbox from '../checkboxTabel/checkbox';
import SortableItem from './sortableItem/SortableItem';
import { cloneDeep } from 'lodash';

type Props = {
  name: string;
  data?: string[] | React.ReactNode[] | { title: string; sort: boolean; nameSort?: string }[];
  onShow: boolean;
  onHide: () => void;
  showTitles: boolean[];
  renderColumns: any[];
  updateTitles: (data: any) => void;
};

const Index = (props: Props) => {
  const { data, onShow, onHide, showTitles, renderColumns, name: nameCoookie, updateTitles } = props;
  const { t } = useTranslation();
  const [showSelected, setShowSelected] = useState<{ title: string; show: boolean }[]>([]);
  const [items, setItems] = useState(renderColumns);

  React.useEffect(() => {
    setShowSelected(
      renderColumns?.map((i: any, idx: number) => ({
        title: i,
        show: showTitles[idx],
      })),
    );
  }, [showTitles, renderColumns]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
  );

  React.useEffect(() => {
    setItems(renderColumns);
  }, [renderColumns]);

  const handleSettings = () => {
    const dataOld = cloneDeep(showSelected);
    const dataNew = items.map((item) => {
      const show = dataOld?.find((i: any) => i.title === item)?.show;
      return {
        title: item,
        show: show,
      };
    });
    updateTitles(dataNew);
    document.cookie = `${nameCoookie}=${JSON.stringify(dataNew)}`;
    onHide();
  };

  const handleReset = () => {
    if (data) {
      setItems(data);
      setShowSelected(
        data?.map((i: any, idx: number) => ({
          title: i,
          show: true,
        })),
      );
    }
  };

  return (
    <Modal isOpen={onShow} toggle={onHide} size="lg">
      <ModalHeader>
        {t('Điều chỉnh cột')}
        <div onClick={onHide} className="off">
          <Icon name="times" />
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="wrapper__settingTable d-flex justify-content-center align-items-center flex-column gap-10">
          <div className="title">{t('Check vào tên cột muốn hiển thị và kéo thả vào vị trí muốn hiển thị')}</div>
          <div className="title__orther">{t('Tiêu đề cột')}</div>
          <div className="dndContext d-flex justify-content-center align-items-center flex-column gap-10">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToParentElement]}
            >
              <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {items.map((i: any, idx: number) => {
                  return (
                    <SortableItem id={i} key={i}>
                      <div className="item__title d-flex justify-content-between align-items-center gap-10">
                        <div className="d-flex justify-content-start align-items-center">
                          <div className="icon__left">
                            <Checkbox
                              checked={showSelected?.find((d: any) => d?.title === i)?.show}
                              onChange={() => {
                                const flag = cloneDeep(showSelected);
                                const findIndex = flag?.findIndex((d: any) => d?.title === i);
                                if (findIndex !== -1) {
                                  flag[findIndex].show = !flag[findIndex].show;
                                }
                                setShowSelected(flag);
                              }}
                            />
                          </div>
                          {t(i)}
                        </div>

                        <div className="icon__right d-flex justify-content-center align-items-center">
                          <Icon name="maximize-alt" />
                        </div>
                      </div>
                    </SortableItem>
                  );
                })}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="modal-footer__left"></div>
        <div className="modal-footer__right">
          <Button
            type="button"
            color="nomal"
            variant="outline"
            onClick={() => {
              onHide();
            }}
          >
            <Icon name="times" />

            {t('Hủy')}
          </Button>
          <Button type="button" color="primary" variant="outline" onClick={handleReset}>
            <Icon name="restore" />
            {t('Thiết lập lại')}
          </Button>
          <Button type="button" color="primary" onClick={handleSettings}>
            <Icon name="document" />
            {t('Lưu')}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
};

export default Index;
