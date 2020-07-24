import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import '../../../App.css';
import * as dataActions from '../../../redux/actions/dataActions';
import BoardContent from './BoardContent';

export default function Board() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataActions.getUserData());
  }, []);

  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const data = useSelector((state) => state.data);
  const { listIds, lists, cards } = data;

  const onDragEnd = (result) => {
    const {
      destination, source, draggableId, type,
    } = result;

    if (type === 'list') {
      const newListIds = Array.from(listIds);
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);

      const payload = {
        listIds: newListIds,
      };
      dispatch(dataActions.moveList(payload));
      return;
    }

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
    dispatch(dataActions.moveCardBetweenLists({ newStart, newFinish }));
  };


  return (
    <BoardContent
      onDragEnd={onDragEnd}
      isAuthenticated={isAuthenticated}
      listIds={listIds}
      lists={lists}
      cards={cards}
    />
  );
}
