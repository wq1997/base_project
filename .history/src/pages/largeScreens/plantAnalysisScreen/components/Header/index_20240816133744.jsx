import styles from "./index.less";
import classNames from "classnames";
import area from "@/assets/images/area.svg";

const areaList = [
    {
        value: "Domestic",
        title: "国内",
    },
    {
        value: "Foreign",
        title: "国外",
    },
];

const Header = ({ typeList, currentType, onChangedType }) => {
    console.log(currentType);
    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                {typeList?.map(item => {
                    return (
                        <div
                            className={classNames(
                                styles.headerLeftLeftItem,
                                currentType == item.value && styles.active
                            )}
                            style={{
                                backgroundColor: "#0B3858",
                                //  background: `url('../../../../../assets/images/area.svg') center center no-repeat`,
                                backgroundSize: item?.value === currentType && "cover",
                            }}
                            onClick={() => onChangedType(item?.value)}
                        >
                            {item?.title}
                        </div>
                    );
                })}
                {areaList?.map(item => {
                    return (
                        <div
                            className={classNames(
                                styles.headerLeftLeftItem,
                                currentType == item.value && styles.active
                            )}
                            style={{
                                backgroundColor: "#0B3858",
                                //  background: `url('../../../../../assets/images/area.svg') center center no-repeat`,
                                backgroundSize: item?.value === currentType && "cover",
                            }}
                            onClick={() => onChangedType(item?.value)}
                        >
                            {item?.title}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Header;
