
export default function Settings() {
    return (
        <div className={'w-full h-screen bg-yellow-500'}>
            <div className={'m-4 border-b'}>
                <h1>Settings</h1>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Month</th>
                            <th>Savings</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <td>Sum</td>
                            <td>$180</td>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr>
                            <td>January</td>
                            <td>$100</td>
                        </tr>
                        <tr>
                            <td>February</td>
                            <td>$80</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}