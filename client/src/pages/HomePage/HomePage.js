import styles from './Home.module.css';
import { useContext } from 'react';
import { ReportContext } from '../../context/ReportContext/ReportContext';
import ShowReports from "../../components/Reports/ShowReports/ShowReports";

function Home() {
  const { reports, loading, error } = useContext(ReportContext);

  return (
      <div className={styles}> 
        <h1>טיפים לטיולים!</h1>
      <ShowReports reports={reports} loading={loading} error={error}/>
    </div>
  )
}

export default Home