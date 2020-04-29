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

  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const data = useSelector((state) => state.data);
  console.log(data);
  const {
    // eslint-disable-next-line camelcase
    list_ids, lists, cards,
  } = data;

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    const start = lists[source.droppableId];
    const finish = lists[destination.droppableId];

    if (start === finish) {
      const newCardIds = Array.from(start.card_ids);

      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newList = {
        ...start,
        card_ids: newCardIds,
      };
      const newState = {
        ...data,
        lists: {
          ...lists,
          [newList.list_id]: newList,
        },
      };
      dispatch(dataActions.setData(newState));
      return;
    }

    const startCardIds = Array.from(start.card_ids);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      card_ids: startCardIds,
    };
    const finishCardIds = Array.from(finish.card_ids);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      card_ids: finishCardIds,
    };
    const newState = {
      ...data,
      lists: {
        ...lists,
        [newStart.list_id]: newStart,
        [newFinish.list_id]: newFinish,
      },
    };
    dispatch(dataActions.setData(newState));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="columns is-mobile board_container">
        {isAuthenticated && (
          list_ids.map((listId) => {
            const list = lists[listId];
            const cardList = list.card_ids.map((cardId) => cards[cardId]);
            return (
              <TrelloList key={listId} list={list} cards={cardList} />
            );
          })
        )}
      </div>
    </DragDropContext>

  );
}

export default Board;
