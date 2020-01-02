import React, { Component } from 'react';
import Aux from '../../../hoc/Auks';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BillList from './BillsList/BillsList';
import { Table, Button } from 'react-bootstrap';
import Spinner from '../../UI/Spinner/Spinner';
import { auth } from '../../Auth/Auth';



// const BillTable = (props) => {
//     const [customerId, setCustomerId] = useState();
//     const [bills, setBills] = useState([]);
//     const [loading, setLoading] = useState(true);
//     let test = props.match.params.customerId;

//     useEffect(() => {
//         axios.get('customerbills/' + test)
//             .then(response => {
//                 setBills(response.data);
//                 setLoading(false);
//             })
//     }, []);


//     return (
//         <>
//             {loading ? <Spinner /> : (
//                 <Aux>
//                     <h4 className="mt-xl-n5"> <Link to="/" >Bill list</Link></h4>
//                     {/* <Button variant="outline-primary"><Link to="/" className="">Customers List</Link></Button> */}
//                     {auth.getUser() ? (<Button variant="outline-primary" className="mb-2"><Link to={"/customers/" + 900 + "/bills/create"}>Create bill</Link></Button>) : ('')}


//                     <Table striped bordered hover>

//                         <thead>
//                             <tr>
//                                 <th>Bill number</th>
//                                 <th>Seller</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {/* {this.billListHandler()} */}
//                             {bills.map((bill, i) => <BillList bill={bill} customerId={900}  key={i} />)}
//                         </tbody>
//                     </Table>
//                 </Aux>
//             )}
//         </>
//     )
// }

class BillTable extends Component {

    constructor(props) {
        super(props);

        let customerId = this.props.match.params.customerId

        this.state = {
            customerId: customerId,
            bills: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get('customerbills/' + this.state.customerId)
            .then(response => {
                this.setState({ bills: response.data, loading: false });
            }).catch(error => {
                console.log(error);
            })
    };

    deleteHandler = (id) => {
        axios.post('/deleteBill', { Id: id })
            .then(response => {
                this.componentDidMount()
            }).catch(error => {
                console.log(error);
            })
    };

    billListHandler = () => {
        return this.state.bills.map((currentBill) => {
            return <BillList bill={currentBill} customerId={this.state.customerId} deleteHandler={this.deleteHandler} key={currentBill.Id} />
        })
    }

    render() {

        if (this.state.loading) {
            return <Spinner />;
        }

        return (
            <Aux>
                <h4 className="mt-xl-n5"> <Link to="/" >Bill list</Link></h4>
                {/* <Button variant="outline-primary"><Link to="/" className="">Customers List</Link></Button> */}
                {auth.getUser() ?
                    (<Button variant="outline-primary" className="mb-2">
                        <Link to={"/customers/" + this.state.customerId + "/bills/create"}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 512 512" width="20" className="mr-1"><path fill="#007bff" d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0" /><path fill="#007bff" d="m368 272h-224c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h224c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" /><path fill="#007bff" d="m256 384c-8.832031 0-16-7.167969-16-16v-224c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v224c0 8.832031-7.167969 16-16 16zm0 0" /></svg>
                            Create bill</Link></Button>)
                    :
                    ('')}


                <Table striped bordered hover>

                    <thead>
                        <tr>
                            <th>Bill number</th>
                            <th>Seller</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.billListHandler()}
                    </tbody>
                </Table>
            </Aux>
        );
    }
}

export default BillTable;