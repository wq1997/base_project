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
                background: '#f1f0f0',
                borderRadius: 8,
                paddingLeft: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 12,
                ...style
            }}
            onClick={onClick}
        >
            {
                label?
                <span>{label}</span>
                :
                <span style={{color: '#b1b1b1'}}>{placeholder}</span>
            }
            <RightOutlined style={{position: 'relative', right: 10}} />
        </div>
    )
}

export default SelectInput;