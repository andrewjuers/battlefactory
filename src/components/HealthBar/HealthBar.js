import styles from "./styles.module.css";

export const HealthBar = ({ value, maxValue, label="hp" }) => (
    <div className={styles.main}>
        <div className={styles.label}>{label}</div>
        <div className={styles.max}>
            <div
                className={styles.value}
                style={{ width: `${(value / maxValue) * 100}%` }}
            >
                {(Math.round(value / maxValue * 1000)) / 10}%
            </div>
        </div>
    </div>
);
