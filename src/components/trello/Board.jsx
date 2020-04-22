import React, { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
import TrelloList from './TrelloList';
import * as dataActions from '../../redux/actions/dataActions';

import '../../App.css';

function Board() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataActions.getUserData());
  }, []);

  const data = useSelector((state) => state.data);
  const {
    // eslint-disable-next-line camelcase
    list_ids, lists, cards,
  } = data;

  const onDragEnd = () => {

  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="columns is-mobile board_container">
        {list_ids.map((listId) => {
          const list = lists[listId];
          const cardList = list.card_ids.map((cardId) => cards[cardId]);
          return (
            <TrelloList key={listId} list={list} cards={cardList} />
          );
        })}
      </div>
    </DragDropContext>

  );
}

export default Board;
