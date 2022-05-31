import * as React from 'react';
import { Fragment, createElement } from 'react';
import { Card } from 'antd';
import { ArrayBase } from '@formily/antd';
import { observer, VoidField } from '@formily/react';
import { IFormItemProps } from '../../shared';
import cls from 'classnames';

const DroppableWidget = () => <div className="lc-container-placeholder">拖拽组件或模板到这里</div>;

// todo: arrayCards 相关操作可以进行配置， 这里偷个懒直接默认都要
export const ArrayCardsPreview: React.FC<IFormItemProps> = observer((props) => {
  // const {
  //   project: { currentDocument },
  // } = (top as any).AliLowCodeEngine;
  // const currentNode = currentDocument.getNodeById(props.componentId);
  const componentProps = props.componentProps?.['x-component-props'] || {};

  const renderCard = () => {
    const children = props.children as any;
    return (
      <ArrayBase disabled>
        <ArrayBase.Item index={0} record={null}>
          <Card
            {...componentProps}
            title={
              <Fragment>
                <ArrayBase.Index />
                <span data-content-editable="x-component-props.title">{componentProps.title}</span>
              </Fragment>
            }
            className={cls('ant-formily-array-cards-item', componentProps.className)}
            extra={
              <Fragment>
                <ArrayBase.Remove />
                <ArrayBase.MoveDown />
                <ArrayBase.MoveUp />
                {componentProps.extra}
              </Fragment>
            }
          >
            <div>{children?.length ? children.map((node) => node) : <DroppableWidget />}</div>
          </Card>
        </ArrayBase.Item>
        <ArrayBase.Addition title="Addition" />
      </ArrayBase>
    );
  };

  return <div>{renderCard()}</div>;
});

ArrayBase.mixin(ArrayCardsPreview);

export default (props) => {
  return (
    <VoidField name={props.fieldProps.name} pattern="editable">
      <ArrayCardsPreview {...props}>{props.children}</ArrayCardsPreview>
    </VoidField>
  );
};
