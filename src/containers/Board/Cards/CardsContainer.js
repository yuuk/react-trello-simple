import React, { Component, PropTypes } from 'react';
import Cards from './Cards';

export default class CardsContainer extends Component {
  static propTypes = {
    item: PropTypes.object,
    x: PropTypes.number,
    moveCard: PropTypes.func.isRequired,
  }

  render() {
    const { item, x, moveCard } = this.props;

    return (
      <div className="desk">
        <div className="desk-head">
          <div className="desk-name">{item.name}</div>
        </div>
        <Cards
          moveCard={moveCard}
          x={x}
          cards={item.cards}
        />
      </div>
    );
  }
}
