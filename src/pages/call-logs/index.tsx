"use client";

import Header from "@/components/Header";
import { useEffect, useState } from 'react';
import CallLogs from '../../components/CallLogs';
import ModalPortal from '../../components/ModalPortal';
import modalStyles from '../../../styles/Modal.module.css';
import '../../app/globals.css'

const Page = () => {
    const [tran, setTran]: [any, any] = useState([]);
    const [modalShow, setModalShow]: [any, any] = useState(false);

  return (
    <>
      <Header theme="dark" hideActionButton={true} isUserLogged={true} />
      <CallLogs parentTran={setTran} modShow={setModalShow} />
      <ModalPortal
        selector="loading-modal"
        show={modalShow}
      >
        <div className={modalStyles.overflow}>
          <div className={modalStyles.modal}>
            <div className={modalStyles.header}>
              <h4>Transcript</h4>
              <button onClick={() => setModalShow(false)}>Close transcript</button>
            </div>
            <div className={modalStyles.body}>
            {
                tran.length ? tran.map((dat: any, id: any) => {
                  return (<p key={id}>Participant: {dat.participant} - {dat.content}</p>)
                }) : <p>No transcript</p>
            }
            </div>
          </div>
        </div>
      </ModalPortal>
      <div id="loading-modal"></div>
    </>
  );
};

export default Page;
