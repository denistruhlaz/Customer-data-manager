import React, { Component } from 'react';
import axios from 'axios';
import BillItem from './BillItem/BillItem';
import Aux from '../../../../hoc/Auks';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Spinner from '../../../UI/Spinner/Spinner';
import { Button } from 'react-bootstrap';
import { auth } from '../../../Auth/Auth';

class BillItems extends Component {

    constructor(props) {
        super(props);

        let billId = this.props.match.params.billId
        let customerId = this.props.match.params.customerId

        this.state = {
            billId: billId,
            customerId: customerId,
            items: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get('/billitems/' + this.state.billId)
            .then(response => {
                this.setState({ items: response.data, loading: false });
                // console.log(this.items);
            }).catch(error => {
                console.log(error);
            })
    }

    deleteHandler = (id) => {
        axios.post('/deleteItem', { Id: String(id) })
            .then(response => {
                this.componentDidMount()
            }).catch(error => {
                console.log(error);
            })
    };

    billItemHandler = () => {
        return this.state.items.map((currentItem) => {
            return <BillItem item={currentItem} key={currentItem.Id} deleteHandler={this.deleteHandler} />
        })
    }

    render() {

        if (this.state.loading) {
            return <Spinner />;
        }

        return (
            <Aux>
                <h4 className="mt-xl-n5"> <Link to="/" >Bill items</Link></h4>
                {auth.getUser() ? (<Button variant="outline-primary" className="mb-2">
                    <Link to={"/customers/" + this.state.customerId + "/" + this.state.billId + "/items/create"}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 512 512" width="20" className="mr-1"><path fill="#007bff" d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0" /><path fill="#007bff" d="m368 272h-224c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h224c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" /><path fill="#007bff" d="m256 384c-8.832031 0-16-7.167969-16-16v-224c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v224c0 8.832031-7.167969 16-16 16zm0 0" /></svg>

                        Add item</Link></Button>)
                    :
                    ('')}


                <Table striped bordered hover>

                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Product number</th>
                            <th>Total price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.billItemHandler()}
                    </tbody>
                </Table>

            </Aux>
        );
    }
}


export default BillItems;