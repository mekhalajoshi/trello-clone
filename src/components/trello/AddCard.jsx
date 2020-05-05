import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';

function AddCard() {
  // const { listId } = props;
  const activateModal = () => {
    document.getElementById('modal').classList.add('is-active');
  };
  const deactivateModal = () => {
    document.getElementById('modal').classList.remove('is-active');
  };

  useEffect(() => {
    window.onclick = function (e) {
      if (e.target.className === 'modal-background') {
        deactivateModal();
      }
    };
  }, []);


  return (
    <div>
      <button onClick={activateModal} type="button" className="add_button button">+ Add another card</button>

    </div>
  );
}
// AddCard.propTypes = {
//   listId: PropTypes.string.isRequired,
// };
export default AddCard;
