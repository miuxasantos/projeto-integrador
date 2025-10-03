import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <div className={styles.div_footer}>
            <p className={styles.p_footer}>© Miuxa Santos - 2025</p>
            <p className={styles.p_footer}>Universidade Paranaense - UNIPAR</p>
        </div>
    );
}

export default Footer;