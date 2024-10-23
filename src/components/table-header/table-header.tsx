import styles from "./table-header.module.scss";
export const TableHeader = () => (
  <div className={styles.row}>
    <div className={styles.callType}>
      <span>Тип</span>
    </div>
    <span className={styles.time}>Время</span>
    <div className={styles.employee}>Сотрудник</div>
    <span className={styles.call}>Звонок</span>
    <span className={styles.source}>Источник</span>
    <div className={styles.rating}>
      <span>Оценка</span>
    </div>
    <span className={styles.duration}>Длительность</span>
  </div>
);
