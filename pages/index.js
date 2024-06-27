import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import apiResources from '../src/APIResources';

export default function Home() {

  const fetchRecordings = async () => {
    const result = await apiResources.get('/FetchData');
    console.log(result);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Test app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.grid}>
          <Link className={styles.card} href="" onClick={(e) => fetchRecordings()}><h3>Fetch All Call Recordings &rarr;</h3></Link>
        </div>
      </main>
    </div>
  );
}
