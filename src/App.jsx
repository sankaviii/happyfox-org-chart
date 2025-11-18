import { EmployeeProvider } from './context/EmployeeContext';
import EmployeeList from './components/EmployeeList/EmployeeList';
import OrgChart from './components/OrgChart/OrgChart';
import styles from './App.module.css';

function App() {
  return (
    <EmployeeProvider>
      <div className={styles.app}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.logo}>HappyFox Org Chart</h1>
            <p className={styles.tagline}>Interactive Employee Organization Chart</p>
          </div>
        </header>

        <main className={styles.main}>
          <aside className={styles.sidebar}>
            <EmployeeList />
          </aside>

          <section className={styles.content}>
            <OrgChart />
          </section>
        </main>
      </div>
    </EmployeeProvider>
  );
}

export default App;
