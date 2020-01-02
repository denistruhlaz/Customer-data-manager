import React, { Component } from "react";
import axios from "axios";
import Aux from "../../../hoc/Auks";
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './CreateItem.css';

class CreateItem extends Component {

    constructor(props) {
        super(props);

        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.onChangeCategoryHandler = this.onChangeCategoryHandler.bind(this);
        this.onChangeProductHandler = this.onChangeProductHandler.bind(this);
        this.onChangeSubcategoryHandler = this.onChangeSubcategoryHandler.bind(this);

        let billId = this.props.match.params.billId
        let customerId = this.props.match.params.customerId

        this.state = {
            BillId: billId,
            CustomerId: customerId,
            ProductId: null,
            Quantity: '',
            Categories: [],
            Subcategories: [],
            Products: []
        }
    }

    componentDidMount = () => {
        axios.get('/categories')
            .then(response => {
                this.setState({ Categories: response.data });
            }).catch(error => {
                console.log(error);
            });
    }

    getSubcategories = (subcategoriesId) => {
        axios.get('/subcategories/' + subcategoriesId)
            .then(response => {
                this.setState({ Subcategories: response.data });
            }).catch(error => {
                console.log(error);
            })
    }

    getProducts = (productsId) => {
        axios.get('/products/' + productsId)
            .then(response => {
                this.setState({ Products: response.data })
            }).catch(error => {
                console.log(error);
            })
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onChangeCategoryHandler = (event) => {
        this.getSubcategories(event.target.value)
        this.getProducts(event.target.value)
    }

    onChangeSubcategoryHandler = (event) => {
        this.getProducts(event.target.value)
    }

    onChangeProductHandler = (event) => {
        this.setState({
            ProductId: parseInt(event.target.value)
        });
    }

    submitHandler = (event) => {
        const createItem = {
            BillId: this.state.BillId,
            ProductId: String(this.state.ProductId),
            Quantity: this.state.Quantity
        }

        axios.post('/additem', createItem)
            .then(response => {
                this.props.history.push('/customers/' + this.state.CustomerId + '/' + this.state.BillId + '/items')
                console.log(response);
            }).catch(error => {
                console.log(error);
            });


        this.setState({
            Quantity: '',
            Products: [],
            ProductId: null
        });

        event.preventDefault();
    }



    render() {
        return (
            <Aux>
                <div className="createForm ml-auto mr-auto mt-4 ">
                    <h4 className="mt-xl-n5"> <Link to="/" >New item</Link></h4>

                    <Form onSubmit={this.submitHandler}>

                        <Form.Group controlId="formBasicCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" onChange={this.onChangeCategoryHandler}>
                                <option>Choose</option>
                                {this.state.Categories.map((categories) => {
                                    return <option key={categories.Id} value={categories.Id}>{categories.Name}</option>
                                })}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicSubcategory">
                            <Form.Label>Subcategory</Form.Label>
                            <Form.Control as="select" onChange={this.onChangeSubcategoryHandler}>
                                <option>Choose</option>
                                {this.state.Subcategories.map((subCategories) => {
                                    return <option key={subCategories.Id} value={subCategories.Id}>{subCategories.Name}</option>
                                })}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicProduct">
                            <Form.Label>Product</Form.Label>
                            <Form.Control as="select" onChange={this.onChangeProductHandler}>{/*  ovo updejtati da koristi isti updatehandler */}
                                <option>Choose</option>
                                {this.state.Products.map((products) => {
                                    return <option key={products.Id} value={products.Id}>{products.Name}</option>
                                })}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" placeholder="Enter quantity" name="Quantity" required value={this.state.Quantity} onChange={this.changeHandler} />
                        </Form.Group>


                        <Button variant="primary" size="lg" block type="submit">Create</Button>
                    </Form>
                </div>
            </Aux>
        )
    }
}

export default CreateItem;