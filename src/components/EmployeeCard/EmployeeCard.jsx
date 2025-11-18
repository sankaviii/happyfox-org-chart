import styles from './EmployeeCard.module.css';

export default function EmployeeCard({ employee, isHighlighted = false }) {
  return (
    <div
      className={`${styles.card} ${isHighlighted ? styles.highlighted : ''}`}
    >
      <div className={styles.header}>
        <h3 className={styles.name}>{employee.name}</h3>
      </div>
      <p className={styles.designation}>{employee.designation}</p>
      <span className={styles.team}>{employee.team}</span>
    </div>
  );
}
