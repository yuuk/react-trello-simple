import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props, monitor, component) {
    // dispatch to redux store that drag is started
    const { item, x, y } = props;
    const { id, title } = item;
    const { clientWidth, clientHeight } = findDOMNode(component);

    return { id, title, item, x, y, clientWidth, clientHeight };
  },
  endDrag(props, monitor) {
    document.getElementById(monitor.getItem().id).style.display = 'block';
  },
};

// options: 4rd param to DragSource https://gaearon.github.io/react-dnd/docs-drag-source.html
const OPTIONS = {
  arePropsEqual: function arePropsEqual(props, otherProps) {
    let isEqual = true;
    if (props.item.id === otherProps.item.id &&
        props.x === otherProps.x &&
        props.y === otherProps.y
       ) {
      isEqual = true;
    } else {
      isEqual = false;
    }
    return isEqual;
  }
};

function collectDragSource(connectDragSource, monitor) {
  return {
    connectDragSource: connectDragSource.dragSource(),
    connectDragPreview: connectDragSource.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

@DragSource('card', cardSource, collectDragSource, OPTIONS)
export default class CardComponent extends Component {
  static propTypes = {
    item: PropTypes.object,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number,
  }

  render() {
    const { isDragging, connectDragSource, item } = this.props;
    const style = {
      display: isDragging ? 'none' : 'block'
    };

    return connectDragSource(
      <div style={style} className="item" id={item.id}>
        <div className="item-name">{item.title}</div>
        <div className="item-container">
          <div className="item-avatar-wrap">
            <img src={`https://randomuser.me/api/portraits/med/men/${item.id}.jpg`} alt="" />
          </div>
          <div className="item-content">
            <div className="item-author">{`${item.firstName} ${item.lastName}`}</div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, banditos.</p>
          </div>
        </div>
      </div>
    );
  }
}
