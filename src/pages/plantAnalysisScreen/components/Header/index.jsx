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
                                style={{
                                    backgroundColor:'#0B3858',
                                    background: item?.value===currentType&&`transparent url(/images/area.svg) center center no-repeat`,
                                    backgroundSize: item?.value===currentType&&'cover'
                                }}
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