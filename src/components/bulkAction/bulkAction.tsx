import React, { useEffect, useRef, useState } from 'react';
import './bulkAction.scss';
import Function from '../../utils/function';
import Button from '../button';
import Icon from '../../assets/icon';

export interface BulkActionItemModel {
  title: string;
  show?: boolean;
  onClick: () => void;
}
interface BulkActionProps {
  className?: string;
  name: string;
  selectedCount: number;
  bulkActionItems: BulkActionItemModel[];
  hasActionItems?: boolean;
}
export default function BulkAction(props: BulkActionProps) {
  const { name, selectedCount, bulkActionItems, className, hasActionItems = true } = props;

  const refBulkAction = useRef();
  const refMain = useRef();
  const [showBulkAction, setShowBulkAction] = useState<boolean>(false);
  Function.useOnClickOutside(refBulkAction, () => setShowBulkAction(false), 'isofh-bulk-action__button');
  return (
    <>
      {bulkActionItems && bulkActionItems.length > 0 && selectedCount > 0 ? (
        <div
          style={{
            padding: hasActionItems ? '0.26rem 1.6rem' : '0.9rem 1.6rem',
          }}
          className={`isofh-bulk-action ${className ? `${className}` : ''}`}
        >
          <ul className="d-flex align-items-center">
            <li className="select-count">
              Đã chọn<span>{selectedCount}</span>
              {name}
            </li>
            <li className="isofh-bulk-action__button">
              {hasActionItems && (
                <Button
                  type="button"
                  color="transparent"
                  variant="outline"
                  onClick={() => setShowBulkAction(!showBulkAction)}
                >
                  Chọn thao tác
                  <Icon name="chevron-down" />
                  {/* {showBulkAction && (
                    <Popover
                      position="left"
                      className="isofh-bulk-action__popover"
                      refContainer={refBulkAction}
                    >
                      <ul>
                        {bulkActionItems.map((item, index) => (
                          <li key={index} onClick={() => item.onClick()}>
                            {item.title}
                          </li>
                        ))}
                      </ul>
                    </Popover>
                  )} */}
                </Button>
              )}
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
}
