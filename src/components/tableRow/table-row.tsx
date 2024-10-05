import styles from "./table-row.module.scss";
import { ReactComponent as IncomingCallIcon } from "../../icons/incoming-call.svg";
import testAvatar from "../../icons/avatar.jpg";
import { Rating } from "../rating/rating";

export const TableRow = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.tableWrapper}>
        <div className={styles.row}>
          <div className={styles.callType}>
            <IncomingCallIcon />
          </div>
          <span className={styles.time}>19:00</span>
          <div className={styles.avatar}>
            <img src={testAvatar} alt="employee-avatar" />
          </div>
          <span className={styles.call}>+7 (987) 567-17-12</span>
          <span className={styles.source}>
            Санкт-Петербург источник в три строки, кто-то так пишет, ну ладно,
            но некрасиво
          </span>
          <div className={styles.rating}>
            <Rating type="error" />
          </div>
          <span className={styles.duration}>12:05</span>
        </div>
        <div className={styles.row}>
          <div className={styles.callType}>
            <IncomingCallIcon />
          </div>
          <span className={styles.time}>19:00</span>
          <div className={styles.avatar}>
            <img src={testAvatar} alt="employee-avatar" />
          </div>
          <span className={styles.call}>+7 (987) 567-17-12</span>
          <span className={styles.source}>Санкт-Петербург</span>
          <div className={styles.rating}>
            {" "}
            <Rating type="perfect" />
          </div>
          <span className={styles.duration}>12:05</span>
        </div>
      </div>
    </div>
  );
};
