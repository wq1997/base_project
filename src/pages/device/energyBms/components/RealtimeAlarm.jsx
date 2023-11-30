import Table from '@/components/Table.jsx'
import { alarmTableColums } from '@/utils/constants'

const RealtimeAlarm = () => {
    const data = [
        {
          key:1,
          deviceId: 1,
          deviceName: 'Joh Brown',
          deviceDes: 32,
          deviceLevel: 'New York No. 1 Lake Park',
          startT: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        },
        {
          key:2,

            deviceId: 2,
            deviceName: 'Jim Green',
            deviceDes: 42,
            deviceLevel: 'London No. 1 Lake Park',
            startT: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
        },
        {
          key:3,
            deviceId: 3,
            deviceName: 'Not Expandable',
            deviceDes: 29,
            deviceLevel: 'Jiangsu No. 1 Lake Park',
            startT: 'This not expandable',
        },
        {
          key:4,
            deviceId: 4,
            deviceName: 'Joe Black',
            deviceDes: 32,
            deviceLevel: 'Sydney No. 1 Lake Park',
            startT: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
        },
      ];
    return (
        <div>
            <Table
                columns={alarmTableColums }
                data={data}
            />
        </div>
    )
}

export default RealtimeAlarm;