import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useMemo } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import * as dataActions from '../../redux/actions/dataActions';
import AddComponent from './AddComponent';
import TrelloList from './TrelloList';

const useStyles = makeStyles({
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 8,
    overflow: 'auto',
    padding: 10,
  },
  title: {
    fontSize: 14,
  },
});
export default function Board() {
  const classes = useStyles();

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

  const innerList = useMemo(
    () => <InnerList listIds={listIds} lists={lists} cards={cards} />, [listIds, lists, cards],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <div
            className={classes.listContainer}
            ref={provided.innerRef}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.droppableProps}
          >
            {isAuthenticated && (
            <>
              {innerList}
              {provided.placeholder}
              <AddComponent isList />
            </>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>

  );
}


export function InnerList(props) {
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
}
