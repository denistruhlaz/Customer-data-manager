import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import lodash from 'lodash';
import PropTypes from 'prop-types';
// import { Paginator } from 'primereact/paginator';


class PaginatioN extends Component {

    
    // pageSizeHandler = (event) => {
    //     let page = parseInt(event.target.value);
    //     this.setState({ pageSize: page });
    // }

    render() {

        const { listCount, pageSize, currentPage, onChange } = this.props;

        const pageCount = Math.ceil(listCount / pageSize);

        if (pageCount === 1) return null;

        const pages = lodash.range(1, pageCount + 1); // creating array of numbers



        return (
            <Pagination className="mr-3 float-right">

                {/* <Form className="mr-auto d-block ml-2" inline>
                    Items per page:
                <FormControl className="ml-2" as="select" onClick={(()=>rows(10))} >
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                    </FormControl>
                </Form> */}

                {/* <Pagination.Item> 1 arrow (previous page) */}
                <Pagination.First href="#" onClick={(() => onChange(1))} disabled={currentPage === 1} />
                {/* </Pagination.Item> */}

                {/* <Pagination.Item> 2 arrows(first page)  */}
                {currentPage <= 1 ? (
                    <Pagination.Prev href="#" disabled={currentPage <= 1} />
                ) : (
                        <Pagination.Prev href="#" onClick={(() => onChange(currentPage - 1))} />
                    )}

                {/* </Pagination.Item>  Mapping the number of pages which depends on data */}

                {pages.map(page => (
                    <Pagination.Item href="#" className={page === currentPage ? 'active' : 'page-item'} key={page} onClick={() => onChange(page)}>
                        {page}
                    </Pagination.Item>
                ))}

                {/* <Pagination.Item> 1 arrow(next page) */}
                {currentPage < pageCount ? (<Pagination.Next href="#" onClick={() => onChange(currentPage + 1)} />
                ) : (
                        <Pagination.Next href="#" disabled />
                    )}
                {/* </Pagination.Item> */}

                {/* <Pagination.Item> 2 arrows(last page)*/}

                {currentPage < pageCount ? (<Pagination.Last href="#" onClick={() => onChange(pageCount)} />
                ) : (
                        <Pagination.Last href="#" disabled />
                    )}

                {/* </Pagination.Item> */}


            </Pagination>



            // igranje s primereactovom paginacijom
            // <div>
            //     <div className="content-section implementation">
            //         <h3>Default</h3>
            //         <Paginator first={this.state.first} rows={this.state.rows} totalRecords={120} rowsPerPageOptions={[10,20,30]} onPageChange={this.onPageChange}></Paginator>

            //         {/* <h3>Custom Template</h3>
            //         <Paginator first={this.state.first2} rows={this.state.rows2} totalRecords={120} rowsPerPageOptions={[10,20,30]} onPageChange={this.onPageChange2}
            //             template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink">

            //             </Paginator> */}
            //     </div>
            // </div>


        );
    }
}

PaginatioN.propTypes = {
    listCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}


export default PaginatioN;