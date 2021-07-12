import React from 'react'
import s from "./currTab.module.css"

const CurrTab = ({currencies}) => {

  
    return (
        <table className={s.table}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>icon</th>
                    <th>name</th>
                    <th>price, $</th>
                </tr>
            </thead>
            <tbody>
            {currencies.map((curr,index)=>
            <tr key={curr.id}>
                    <td>{index+1}</td>
                    <td>
                    <img src={curr.logo_url} alt={curr.name} width={20} height={20}/>
                    </td>
                    <td>{curr.name}</td>
                    <td>{curr.price}</td>
                </tr> )}
        
            </tbody>
        </table>
    );
}

export default CurrTab;