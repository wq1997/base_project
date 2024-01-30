import styles from "./index.less";
import useIcon from "@/hooks/useIcon";
const Title = (props) => {
    const Icon = useIcon();
    return (
        <div className={styles.icon}>
            <Icon 
                type={props?.icon} 
                style={{
                    color: '#03B4B4',
                    fontSize: 20
                }}
            />
            <div className={styles.title}>{props?.title}</div>
        </div>
    )
}

export default Title;