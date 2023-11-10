import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Checkbox from '../../checkboxTabel/checkbox';

const SortableItem = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform) ?? '',
    transition: transition ?? '',
  };

  if (props.handle) {
    return (
      <div ref={setNodeRef} style={style} {...attributes}>
        {props.handle ? (
          <span className="dragHandleClass" {...listeners}>
            # some svg/img/htmlelement
          </span>
        ) : null}
        {props.children}
      </div>
    );
  }

  return <Item ref={setNodeRef} style={style} {...listeners} {...attributes} {...props} />;
};

export default React.memo(SortableItem);

const Item = React.forwardRef((props: any, ref: any) => {
  return <div ref={ref} {...props}></div>;
});
