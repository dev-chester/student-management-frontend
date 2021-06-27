import React, { useState, useEffect } from 'react';


const TableResults = ( props ) => {
    const [infoState, setInfoState] = useState(props.info);
    console.log(props.info);
    console.log(infoState);
    let aEmails = [];
    debugger;
    if (!props.info.data) {
        return null;
    } else {
        return (
            <div>
                {
                    <table>
                        <tr>
                            <th>Email</th>
                        </tr>
                        {
                            props.info.data.students.map(email => (
                                <tr>
                                    <td>{email}</td>
                                </tr>
                            ))
                        }
                    </table>
                }

            </div>
        );
    }


}

export default TableResults;