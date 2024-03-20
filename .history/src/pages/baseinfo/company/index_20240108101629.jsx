

const Company = () => {


    return (
        <div>

            <div className="search">
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </div>

        </div>
    )
}

export default Company;