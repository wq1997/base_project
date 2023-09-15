import { RightOutlined } from '@ant-design/icons';

const SelectInput = (props) => {
    const {
        placeholder,
        style,
        value,
        onClick,
        label
    } = props;

    return (
        <div
            style={{
                height: '40px',
                borderRadius: 8,
                paddingLeft: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                fontSize: 12,
                ...style
            }}
            onClick={onClick}
        >
            <div
                style={{
                    fontSize: '17px',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    display: 'block',
                    width: '150px',
                    textAlign: 'right'
                }}
            >
                {
                    label?
                    <span style={{color: '#666666'}}>{label}</span>
                    :
                    <span style={{color: '#ccc'}}>{placeholder}</span>
                }
            </div>
            <RightOutlined style={{marginLeft: 10, fontSize: 17}} />
        </div>
    )
}

export default SelectInput;