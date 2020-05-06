/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icon, Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from 'react-textarea-autosize';
import { nanoid } from 'nanoid';
import * as dataActions from '../../redux/actions/dataActions';

const useStyles = makeStyles({
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 3,
    height: 36,
    paddingLeft: 10,
    minWidth: 272,
  },
  textArea: {
    resize: 'none',
    width: '100%',
    height: '100%',
    outline: 'none',
    border: 'none',
    overfolw: 'hidden',
    backgroundColor: 'pink',

  },
  textAreaContainer: {
    minHeight: 80,
    minWidth: 272,
    padding: '6px 8px 2px',
  },
  button: {
    color: 'white',
    backgroundColor: '#5aac44',
  },
  icon: {
    marginLeft: 8,
    cursor: 'pointer',
  },
  formButtonGroup: {
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
  },
});

function AddComponent(props) {
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [text, setText] = useState('');
  const { isList, currentList } = props;
  const classes = useStyles();
  const closeForm = () => {
    setFormOpen(false);
    setText('');
  };

  const getNewId = () => nanoid();


  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const openForm = () => {
    setFormOpen(true);
  };

  const handleAddList = () => {
    const payload = {
      newList: {
        listId: getNewId(),
        listName: text,
        cardIds: [],
      },
    };
    dispatch(dataActions.addList(payload));
  };

  const handleAddCard = () => {
    const newId = getNewId();
    const newCardIds = Array.from(currentList.cardIds);
    newCardIds.splice(currentList.cardIds.length, 0, newId);
    const newList = {
      ...currentList,
      cardIds: newCardIds,
    };
    const payload = {
      card: {
        cardId: newId,
        cardTitle: text,
        cardDesc: '',
      },
      newList,

    };
    dispatch(dataActions.addCard(payload));
  };


  const renderForm = () => {
    const placeholder = isList ? 'Enter List Title..' : 'Enter a title for this card..';
    const buttonTitle = isList ? 'Add list' : 'Add Card';
    return (
      <div>
        <Card className={classes.textAreaContainer}>
          <TextareaAutosize
            className={classes.textArea}
            placeholder={placeholder}
            autoFocus
            onBlur={closeForm}
            value={text}
            onChange={handleTextChange}
          />
        </Card>
        <div className={classes.formButtonGroup}>
          <Button
            onMouseDown={isList ? handleAddList : handleAddCard}
            variant="contained"
            className={classes.button}
          >
            {buttonTitle}
          </Button>
          <Icon className={classes.icon}>close</Icon>
        </div>
      </div>
    );
  };

  const renderComponent = () => {
    const buttonText = isList ? 'Add another list' : 'Add another card';
    const buttonTextOpacity = isList ? 1 : 0.5;
    const buttonTextColor = isList ? 'white' : 'inherit';
    const buttonTextBackground = isList ? 'rgba(0,0,0,.15)' : 'inherit';

    return (
      <div
        onClick={openForm}
        className={classes.buttonGroup}
        style={{
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          backgroundColor: buttonTextBackground,
        }}
      >
        <Icon>
          add
        </Icon>
        {buttonText}
      </div>
    );
  };

  return (
    formOpen ? renderForm() : renderComponent()
  );
}


export default AddComponent;
