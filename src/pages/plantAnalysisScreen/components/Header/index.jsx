import styles from "./index.less";

const Header = ({
    typeList,
    currentType,
    onChangedType,
}) => {
    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                {
                    typeList?.map(item => {
                        return (
                            <div 
                                className={styles.headerLeftLeftItem} 
                                style={{background:item?.value===currentType?'radial-gradient(359% 64% at 49% 50%, #0B3858 0%, #2BC4FF 100%)':'#0B3858'}}
                                onClick={()=>onChangedType(item?.value)}
                            >
                                {item?.title}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Header;