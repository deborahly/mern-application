import './modal.styles.css';

export default function Modal({ show, text, handleConfirm, handleClose }) {
  const showHideClassName = show
    ? 'modal modal__display--block'
    : 'modal modal__display--none';

  return (
    <div className={showHideClassName}>
      <section className='modal__main'>
        {text}
        <div class='modal__btn-group'>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={handleConfirm}
          >
            Yes
          </button>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={handleClose}
          >
            No
          </button>
        </div>
      </section>
    </div>
  );
}
