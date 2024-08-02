import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import modalStyles from '../styles/Modal.module.css';
import apiResources from '../src/APIResources';
import { useEffect, useState } from 'react';
import Pagination from 'rc-pagination';
import ClientPortal from '../components/ClientPortal/ClientPortal';

export const getServerSideProps = async () => {
  // Load initial table
  const callLogs = await apiResources.get(`/get-call-logs?page=1&limit=50`);

  console.log(callLogs.data.retrievedRows);
  return {
    props: { datatableUsers: callLogs.data.retrievedRows }
  }
};

export default function Home({ datatableUsers }) {
  const [showPortal, setShowPortal] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [currentTran, setCurrentTran] = useState([]);
  const [currentEntries, setCurrentEntries] = useState(datatableUsers.length ? datatableUsers : []);

  const handleModal = () => {
    setShowPortal(!showPortal);
  };
  
  const PerPageChange = (value) => {
      setSize(value);
      const newPerPage = Math.ceil(datatableUsers.length / value);
      if (current > newPerPage) {
          setCurrent(newPerPage);
      }
  };
  
  const PaginationChange = (page, pageSize) => {
      setCurrent(page);
      setSize(pageSize);
  };

  const PrevNextArrow = (current, type, originalElement) => {
      if (type === 'prev') return <button><i className="fa fa-angle-double-left"></i></button>;
      if (type === 'next') return <button><i className="fa fa-angle-double-right"></i></button>;
      return originalElement;
  }

  const fetchRecordings = async () => {
    const res = await apiResources.post("/coldstart-entries", {});
  };

  const fetchCallLogs = async () => {
    const res = await apiResources.post("/fetch-call-log", {});
  };

  const openTranscript = (data) => {
    if (data.transcript) {
      setCurrentTran(JSON.parse(data.transcript));
    }
    setShowPortal(true);
  };

  useEffect(() => {
    const call = async () => {
        const newCallLogs = await apiResources.get(`/get-call-logs?page=${current}&limit=${perPage}`);
        setCurrentEntries(newCallLogs.data.retrievedRows);
    };
    call();
  }, [current, perPage]);

  return (
    <>
    <div className={styles.container}>
    <Head>
      <title>Test app</title>
    </Head>

    <main>
      <div className={styles.grid}>
        <Link className={styles.card} href="" onClick={async (e) => fetchRecordings()}><h3>Fill table &rarr;</h3></Link>
      </div>
      <div className={styles.grid}>
        <Link className={styles.card} href="" onClick={(e) => fetchCallLogs()}><h3>Fetch All Call Recordings &rarr;</h3></Link>
      </div>
    </main>
    <div className="container-fluid mt-5 mb-5">
        <div className="row justify-content-center">
            <div className="col-md-10">
                <div className="card">
                <div className="card-body p-0">
                    
                    <div className="table-filter-info">
                        
                        <Pagination
                            className="pagination-data"
                            showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                            onChange={PaginationChange}
                            total={currentEntries.length}
                            current={current}
                            pageSize={size}
                            showSizeChanger={true}
                            itemRender={PrevNextArrow}
                            onShowSizeChange={PerPageChange}
                        />
                    </div>
                    <div className="table-responsive">
                        <table className="table table-text-small mb-0">
                            <thead className="thead-primary table-sorting">
                                <tr>
                                    <th>#</th>
                                    <th>Call Date</th>
                                    <th>Client ID</th>
                                    <th>Transcript</th>
                                    <th>Call Recording Location</th>
                                    <th>Record Fetched?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentEntries.length > 0 ? currentEntries.map((data, index) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.id}</td>
                                                <td>{data.call_date}</td>
                                                <td>{data.buyer_id}</td>
                                                <td>{<button className="btn" onClick={() => openTranscript(data)}></button>}</td>
                                                <td>{data.call_recording ?? null}</td>
                                                <td>{data.record_fetched ? 'Yes' : 'No'}</td>
                                            </tr>
                                        )
                                    }) : []
                                }
                            </tbody>
                        </table>
                    </div>
                  <div className="table-filter-info">
                        
                        <Pagination
                            className="pagination-data"
                            showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                            onChange={PaginationChange}
                            total={currentEntries.length}
                            current={current}
                            pageSize={size}
                            showSizeChanger={true}
                            itemRender={PrevNextArrow}
                            onShowSizeChange={PerPageChange}
                        />
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    </div>
    <ClientPortal
        selector="loading-modal"
        show={showPortal}
      >
        <div className={modalStyles.overflow}>
          <div className={modalStyles.modal}>
            <div className={modalStyles.header}>
              <h4>Transcript</h4>
              <button onClick={() => setShowPortal(false) && setCurrentTran([])}>Close transcript</button>
            </div>
            <div className={modalStyles.body}>
              {
                currentTran.length ? currentTran.map((dat, id) => {
                  return (<p key={id}>Participant: {dat.participant} - {dat.content}</p>)
                }) : <p>No transcript</p>
              }
            </div>
          </div>
        </div>
      </ClientPortal>
</>
  );
}
