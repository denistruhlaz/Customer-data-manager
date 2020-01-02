import React, { Component } from 'react';
import Aux from '../../../hoc/Auks';
import axios from 'axios';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './CreateBill.css';

// var DatePicker = require("react-bootstrap-date-picker");

class CreateBill extends Component {

    constructor(props) {
        super(props);

        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);

        let customerId = this.props.match.params.customerId

        this.state = {
            Date: null,
            BillNumber: '',
            CustomerId: customerId,
            SellerId: null,
            // CreditCardId: null,
            Comment: '',
            Sellers: []
            // CreditCards: []
            // errors:{
            //     SellerId: null,
            //     CreditCardId: null
            // }
        }

    }

    componentDidMount() {
        this.getSellers();
        // this.getCreditCards();
    }

    getSellers = () => {
        axios.get('/sellers')
            .then(response => {
                this.setState({ Sellers: response.data });
            })
            .catch(error => {
                console.log(error);
            })
    }

    // getCreditCards = () => {
    //     axios.get('/creditcards')
    //         .then(response => {
    //             this.setState({ CreditCards: response.data });
    //             // console.log(response)
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    changeDateHandler = (date) => {
        this.setState({
            Date: date
          });
    }

    // validation = () => {
    //     const error
    // }


    submitHandler = (event) => {

        const createBill = {
            Date: Moment(this.state.Date).format('YYYY-MM-DD'),
            BillNumber: this.state.BillNumber,
            CustomerId: this.state.CustomerId,
            SellerId: this.state.SellerId,
            // CreditCardId: this.state.CreditCardId,
            Comment: this.state.Comment
        }

        axios.post('/addbill', createBill)
            .then(response => {
                // this.props.history.replace('/')
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });

        this.setState({
            Date: '',
            BillNumber: '',
            CustomerId: null,
            SellerId: null,
            // CreditCardId: null,
            Comment: ''
        })
        this.props.history.push('/customers/' + createBill.CustomerId + '/bills');

        event.preventDefault();
    }




    render() {
        return (

            <Aux>
                <div className="createForm ml-auto mr-auto mt-4">
                    <h4 className="mt-xl-n5"> <Link to="/" >New bill</Link></h4>

                    <Form onSubmit={this.submitHandler}>

                        <Form.Group controlId="formBasicBillNumber">
                            <Form.Label>Bill number</Form.Label>
                            <Form.Control type="text" placeholder="Enter bill number" name="BillNumber" required value={this.state.BillNumber} onChange={this.changeHandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicSeller">
                            <Form.Label>Seller</Form.Label>
                            <Form.Control as="select" onChange={this.changeHandler}>
                                <option>Choose</option>
                                {this.state.Sellers.slice(0, 20).map((seller) => {
                                    return <option key={seller.Id} value={seller.Id}>{seller.Name} {seller.Surname}</option>
                                })}
                            </Form.Control>
                        </Form.Group>

                        {/* <Form.Group controlId="formBasicCreditCard">
                            <Form.Label>Credit card</Form.Label>
                            <Form.Control as="select" name="CreditCardId" onChange={this.changeHandler}>
                                <option>Choose</option>
                                {this.state.CreditCards && this.state.CreditCards.slice(0, 400).map((creditCards) => {
                                    return <option key={creditCards.Id} value={creditCards.Id}>{creditCards.CardNumber}</option>
                                })}
                            </Form.Control>
                        </Form.Group> */}

                        <Form.Group controlId="formBasicComment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control type="text" placeholder="Enter comment" name="Comment" required value={this.state.Comment} onChange={this.changeHandler} />
                        </Form.Group>

                        <Form.Group controlId="formBasicDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" value="2015-08-09" data-date-format="YYYY-MM-DD" placeholder="Enter Date" name="Date" required  onChange={this.changeDateHandler} />
                        </Form.Group>

                        {/* <DatePicker id="example-datepicker" onChange={this.changeHandler}> */}
                        
                    {/* </DatePicker> */}


                        <Button variant="primary" size="lg" block type="submit">Create</Button>
                    </Form>
                </div>
            </Aux>
        );
    }
}


export default CreateBill;