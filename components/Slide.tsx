import styles from "../styles/slide.module.css";

export default function Slide({ children }: { children: React.ReactNode }) {
    return <div className={styles.slide}>
        {children}
    </div>
}