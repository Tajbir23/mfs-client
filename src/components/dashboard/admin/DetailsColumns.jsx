

const DetailsColumns = (id) => {
    const columns = [
        {
            title: "User name",
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'status',
            dataIndex:'status',
            key:'status'
        },
        {
            title: "Balance",
            dataIndex: 'balance',
            key: 'balance'
        }
    ]
    
    if(id === "transactions" || id === "cash_in" || id === "cash_out" || id === "cash_in_request" || id === "send_money" || id === "cash_in_accept" || id === "cash_out_success" || id === "cash_in_reject"){
        columns.splice(0, 4)
        columns.push(
            {
                title: "Type",
                dataIndex: 'type',
                key: 'type'
            },
            {
                title: "Request Phone",
                dataIndex: 'requestPhone',
                key: 'requestPhone'
            },
            {
                title: "Amount",
                dataIndex: 'amount',
                key: 'amount'
            },
            {
                title: "Deducted",
                dataIndex: 'deducted',
                key: 'deducted'
            },
            {
                title: "Agent",
                dataIndex: 'agent',
                key: 'agent'
            },
            {
                title: "Receiver",
                dataIndex:'receiver',
                key:'receiver'
            },
            {
                title: "Date",
                dataIndex: 'date',
                key: 'date'
            }
        )
    }

    if(id === "cash_in" || id === "cash_out" || id === "cash_in_accept" || id ==="cash_in_reject"){
        delete columns[5]
    }

    if(id === "send_money"){
        delete columns[4]
    }

    if(id === "cash_in_request"){
        delete columns[5]
        delete columns[4]
    }

    return columns
}

export default DetailsColumns