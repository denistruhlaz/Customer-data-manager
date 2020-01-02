import React from 'react';
import { auth } from '../../../../Auth/Auth';
import { Button } from 'react-bootstrap';


const billItem = (props) => (
    <tr>
        <td>{props.item.Product.Name}</td>
        <td>{props.item.Product.ProductNumber}</td>
        <td>{props.item.TotalPrice}</td>
        <td>{props.item.Quantity}</td>
        <td>
            {auth.getUser() ? (<Button variant="link" className="ml-1" onClick={() => props.deleteHandler(props.item.Id)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 512 512" width="24"><path fill="#007bff" d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0" /><path fill="#007bff" d="m176.8125 351.1875c-4.097656 0-8.195312-1.554688-11.308594-4.691406-6.25-6.25-6.25-16.382813 0-22.632813l158.398438-158.402343c6.253906-6.25 16.386718-6.25 22.636718 0s6.25 16.382812 0 22.636718l-158.402343 158.398438c-3.15625 3.136718-7.25 4.691406-11.324219 4.691406zm0 0" /><path fill="#007bff" d="m335.1875 351.1875c-4.09375 0-8.191406-1.554688-11.304688-4.691406l-158.398437-158.378906c-6.253906-6.25-6.253906-16.382813 0-22.632813 6.25-6.253906 16.382813-6.253906 22.632813 0l158.398437 158.398437c6.253906 6.25 6.253906 16.382813 0 22.632813-3.132813 3.117187-7.230469 4.671875-11.328125 4.671875zm0 0" /></svg>
            </Button>) : ('')}
        </td>
    </tr>
)


export default billItem;