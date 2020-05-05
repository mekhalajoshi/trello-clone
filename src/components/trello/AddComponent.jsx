/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Icon, Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from 'react-textarea-autosize';
// import Textarea from 'react-textarea-autosize';

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
    outline: 'none',
    border: 'none',
    overfolw: 'hidden',

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
  const [formOpen, setFormOpen] = useState(false);
  const [text, setText] = useState('');
  const { list } = props;
  const classes = useStyles();

  const closeForm = () => {
    setFormOpen(false);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };


  const renderForm = () => {
    const placeholder = list ? 'Enter List Title..' : 'Enter a title for this card..';
    const buttonTitle = list ? 'Add list' : 'Add Card';
    return (
      <div>
        <Card
          className={classes.textAreaContainer}
        >
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

  const openForm = () => {
    setFormOpen(true);
  };

  const renderComponent = () => {
    const buttonText = list ? 'Add another list' : 'Add another card';
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? 'white' : 'inherit';
    const buttonTextBackground = list ? 'rgba(0,0,0,.15)' : 'inherit';

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
