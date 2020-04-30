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
    listIds, lists, cards,
  } = data;

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    const start = lists[source.droppableId];
    const finish = lists[destination.droppableId];

    if (start === finish) {
      const newCardIds = Array.from(start.cardIds);

      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newList = {
        ...start,
        cardIds: newCardIds,
      };
      // const newState = {
      //   ...data,
      //   lists: {
      //     ...lists,
      //     [newList.listId]: newList,
      //   },
      // };
      // // dispatch(dataActions.setData(newState));
      dispatch(dataActions.moveCardWithinList(newList));
      return;
    }

    const startCardIds = Array.from(start.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      cardIds: startCardIds,
    };
    const finishCardIds = Array.from(finish.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      cardIds: finishCardIds,
    };
    const newState = {
      ...data,
      lists: {
        ...lists,
        [newStart.listId]: newStart,
        [newFinish.listId]: newFinish,
      },
    };
    dispatch(dataActions.setData(newState));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="columns is-mobile board_container">
        {/* {isAuthenticated && ( */}
        {
          listIds.map((listId) => {
            const list = lists[listId];
            const cardList = list.cardIds.map((cardId) => cards[cardId]);
            return (
              <TrelloList key={listId} list={list} cards={cardList} />
            );
          })
        }
        {/* )} */}
      </div>
    </DragDropContext>

  );
}

export default Board;
