import { React, useState } from 'react';
import Modal from '../Modal/Modal';
import OwnerForm from './Owner/OwnerRequest';
import MemberForm from './Member/MemberRequest';
import css from './Request.module.scss';

function Request({ onClose, modalImages }) {
  const [openMemberForm, setOpenMemberForm] = useState(true);
  const [openOwnerForm, setOpenOwnerForm] = useState(false);

  const openMember = () => {
    if (openMemberForm === false) {
      setOpenMemberForm(true);
      setOpenOwnerForm(false);
    } else if (openMemberForm === true) {
      setOpenMemberForm(true);
    }
  };

  const openOwner = () => {
    if (openOwnerForm === false) {
      setOpenOwnerForm(true);
      setOpenMemberForm(false);
    } else if (openOwnerForm === true) {
      setOpenOwnerForm(true);
    }
  };

  const requestModalImage = modalImages.find(image => {
    return image.title === '요청하기';
  });

  return (
    <Modal onClose={onClose} modalImage={requestModalImage.image}>
      <section className={css.requestContainer}>
        <div className={css.selectedBox}>
          <button
            className={openMemberForm ? css.memberRequest : css.notSelected}
            onClick={openMember}
          >
            멤버요청
          </button>
          <span>|</span>
          <button
            className={openOwnerForm ? css.ownerRequest : css.notSelected}
            onClick={openOwner}
          >
            대표요청
          </button>
        </div>
        <div className={css.requestForm}>
          {openMemberForm ? <MemberForm /> : <OwnerForm />}
        </div>
      </section>
    </Modal>
  );
}

export default Request;
