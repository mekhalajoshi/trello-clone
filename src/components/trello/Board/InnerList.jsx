import React from 'react';
import PropTypes from 'prop-types';
import TrelloList from '../TrelloList';

const InnerList = (props) => {
  const { listIds, lists, cards } = props;
  return (
    listIds.map((listId, index) => {
      const list = lists[listId];
      const cardList = list.cardIds.map((cardId) => cards[cardId]);
      return (
        <TrelloList key={listId} list={list} cards={cardList} index={index} />
      );
    })
  );
};

InnerList.propTypes = {
  listIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  lists: PropTypes.objectOf(PropTypes.any).isRequired,
  cards: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default InnerList;
