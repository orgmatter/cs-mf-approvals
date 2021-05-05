import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function TableHeaders(props) {

    const { tableHeaderProps } = props;
    const {
        filterType,
        filterSearchInputVal,
        handleFilterChange,
        handleFundSearchKeyPress,
        adminRoles,
        requestType,
        isPaymentDate,
    } = tableHeaderProps;

    return (
        <DialogTitle className="table-header-cover">
            {/* {
                requestType !== 'subscription' && adminRoles !== 'Line Manager Approval' &&
                
            } */}
            <div className="table-header1-cover-flex">
                <div className="table-header1-cover-item">
                    <div className={adminRoles === 'Fund Manager Approval' || adminRoles === 'Payment Processor' ? 'table-filter-cover-flex table-filter-cover-flex-payment': 'table-filter-cover-flex table-filter-cover-flex-nopayment'}>
                        {
                            adminRoles === 'Fund Manager Approval' || adminRoles === 'Payment Processor' ?
                            <>
                                <div className="table-filter-cover-item">
                                    <div className="filter-outer-cover-flex">
                                        <div className="filter-outer-cover-item">
                                            <div className="filter-inner-cover-flex">
                                                {/* <div className="filter-inner-cover-item">
                                                    <FilterListIcon className="filter-icon" />
                                                    <span className="filter-icon-text">Filter</span>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="filter-outer-cover-item">
                                            <div className="filter-inner-cover-flex">
                                                <div className="filter-inner-cover-item">
                                                    {/* <label className="label-cover" htmlFor="fund_code_input"></label> */}
                                                    <input
                                                        className="fund-code-input"
                                                        id="fund_code_input"
                                                        name="fundCode"
                                                        type="text"
                                                        onChange={handleFundSearchKeyPress}
                                                        value={filterSearchInputVal}
                                                        placeholder="Search"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="filter-outer-cover-item">
                                            <div className="filter-inner-cover-flex">
                                                <div className="filter-inner-cover-item">
                                                    <div className="filter-label-cover-flex">
                                                        <div className="filter-label-cover-item">
                                                            <label className="label-cover" htmlFor="all-radio">
                                                                <Paper 
                                                                    className="label-btn-cover"
                                                                    color="default"
                                                                    variant="contained"
                                                                    type="button"
                                                                >
                                                                    <input
                                                                        className="radio-input"
                                                                        id="all-radio"
                                                                        name="filterRadio"
                                                                        type="radio"
                                                                        onChange={(event) => handleFilterChange(event, 'all')}
                                                                        value={''}
                                                                        checked={filterType === 'all' || filterType === '' && filterSearchInputVal === ''}
                                                                    />
                                                                    <span className="radio-label">All</span>
                                                                </Paper>
                                                            </label>
                                                        </div>
                                                        <div className="filter-label-cover-item">
                                                            <label className="label-cover" htmlFor="pending-radio">
                                                                <Paper 
                                                                    className="label-btn-cover"
                                                                    color="default"
                                                                    variant="contained"
                                                                    type="button"
                                                                >
                                                                    <input
                                                                        className="radio-input"
                                                                        id="pending-radio"
                                                                        name="filterRadio"
                                                                        type="radio"
                                                                        onChange={(event) => handleFilterChange(event, 'pending')}
                                                                        value={''}
                                                                        checked={filterType === 'pending'}
                                                                    />
                                                                    <span className="radio-label">Pending</span>
                                                                </Paper>
                                                            </label>
                                                        </div>
                                                        <div className="filter-label-cover-item">
                                                            <label className="label-cover" htmlFor="approved-radio">
                                                                <Paper 
                                                                    className="label-btn-cover"
                                                                    color="default"
                                                                    variant="contained"
                                                                    type="button"
                                                                >
                                                                    <input
                                                                        className="radio-input"
                                                                        id="approved-radio"
                                                                        name="filterRadio"
                                                                        type="radio"
                                                                        onChange={(event) => handleFilterChange(event, 'approved')}
                                                                        value={''}
                                                                        checked={filterType === 'approved'}
                                                                    />
                                                                    <span className="radio-label">Approved</span>
                                                                </Paper>
                                                            </label>
                                                        </div>
                                                        <div className="filter-label-cover-item">
                                                            <label className="label-cover" htmlFor="declined-radio">
                                                                <Paper 
                                                                    className="label-btn-cover"
                                                                    color="default"
                                                                    variant="contained"
                                                                    type="button"
                                                                >
                                                                    <input
                                                                        className="radio-input"
                                                                        id="declined-radio"
                                                                        name="filterRadio"
                                                                        type="radio"
                                                                        onChange={(event) => handleFilterChange(event, 'declined')}
                                                                        value={''}
                                                                        checked={filterType === 'declined'}
                                                                    />
                                                                    <span className="radio-label">Declined</span>
                                                                </Paper>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-filter-cover-item">
                                    <div className="filter-outer-cover-flex">
                                        <div className="filter-outer-cover-item">
                                            <div className="filter-inner-cover-flex">
                                                <div className="filter-inner-cover-item">
                                                    <div className="filter-label-cover-flex">
                                                        <div className="filter-label-cover-item">
                                                            <label className="label-cover" htmlFor="paid-radio">
                                                                <Paper 
                                                                    className="label-btn-cover"
                                                                    color="default"
                                                                    variant="contained"
                                                                    type="button"
                                                                >
                                                                    <input
                                                                        className="radio-input"
                                                                        id="paid-radio"
                                                                        name="filterRadio"
                                                                        type="radio"
                                                                        onChange={(event) => handleFilterChange(event, 'paid')}
                                                                        value={''}
                                                                        checked={filterType === 'paid'}
                                                                    />
                                                                    <span className="radio-label">Paid</span>
                                                                </Paper>
                                                            </label>
                                                        </div>
                                                        <div className="filter-label-cover-item">
                                                            <label className="label-cover" htmlFor="not-paid-radio">
                                                                <Paper 
                                                                    className="label-btn-cover"
                                                                    color="default"
                                                                    variant="contained"
                                                                    type="button"
                                                                >
                                                                    <input
                                                                        className="radio-input"
                                                                        id="not-paid-radio"
                                                                        name="filterRadio"
                                                                        type="radio"
                                                                        onChange={(event) => handleFilterChange(event, 'notPaid')}
                                                                        value={''}
                                                                        checked={filterType === 'notPaid'}
                                                                    />
                                                                    <span className="radio-label">Not Paid</span>
                                                                </Paper>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>:
                            <div className="table-filter-cover-item">
                                <div className="filter-outer-cover-flex">
                                    <div className="filter-outer-cover-item">
                                        <div className="filter-inner-cover-flex">
                                            {/* <div className="filter-inner-cover-item">
                                                <FilterListIcon className="filter-icon" />
                                                <span className="filter-icon-text">Filter</span>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="filter-outer-cover-item">
                                        <div className="filter-inner-cover-flex">
                                            <div className="filter-inner-cover-item">
                                                {/* <label className="label-cover" htmlFor="fund_code_input"></label> */}
                                                <input
                                                    className="fund-code-input"
                                                    id="fund_code_input"
                                                    name="fundCode"
                                                    type="text"
                                                    onChange={handleFundSearchKeyPress}
                                                    value={filterSearchInputVal}
                                                    placeholder="Search"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="filter-outer-cover-item">
                                        <div className="filter-inner-cover-flex">
                                            <div className="filter-inner-cover-item">
                                                <div className="filter-label-cover-flex">
                                                    <div className="filter-label-cover-item">
                                                        <label className="label-cover" htmlFor="all-radio">
                                                            <Paper 
                                                                className="label-btn-cover"
                                                                color="default"
                                                                variant="contained"
                                                                type="button"
                                                            >
                                                                <input
                                                                    className="radio-input"
                                                                    id="all-radio"
                                                                    name="filterRadio"
                                                                    type="radio"
                                                                    onChange={(event) => handleFilterChange(event, 'all')}
                                                                    value={''}
                                                                    checked={filterType === 'all' || filterType === '' && filterSearchInputVal === ''}
                                                                />
                                                                <span className="radio-label">All</span>
                                                            </Paper>
                                                        </label>
                                                    </div>
                                                    <div className="filter-label-cover-item">
                                                        <label className="label-cover" htmlFor="pending-radio">
                                                            <Paper 
                                                                className="label-btn-cover"
                                                                color="default"
                                                                variant="contained"
                                                                type="button"
                                                            >
                                                                <input
                                                                    className="radio-input"
                                                                    id="pending-radio"
                                                                    name="filterRadio"
                                                                    type="radio"
                                                                    onChange={(event) => handleFilterChange(event, 'pending')}
                                                                    value={''}
                                                                    checked={filterType === 'pending'}
                                                                />
                                                                <span className="radio-label">Pending</span>
                                                            </Paper>
                                                        </label>
                                                    </div>
                                                    <div className="filter-label-cover-item">
                                                        <label className="label-cover" htmlFor="approved-radio">
                                                            <Paper 
                                                                className="label-btn-cover"
                                                                color="default"
                                                                variant="contained"
                                                                type="button"
                                                            >
                                                                <input
                                                                    className="radio-input"
                                                                    id="approved-radio"
                                                                    name="filterRadio"
                                                                    type="radio"
                                                                    onChange={(event) => handleFilterChange(event, 'approved')}
                                                                    value={''}
                                                                    checked={filterType === 'approved'}
                                                                />
                                                                <span className="radio-label">Approved</span>
                                                            </Paper>
                                                        </label>
                                                    </div>
                                                    <div className="filter-label-cover-item">
                                                        <label className="label-cover" htmlFor="declined-radio">
                                                            <Paper 
                                                                className="label-btn-cover"
                                                                color="default"
                                                                variant="contained"
                                                                type="button"
                                                            >
                                                                <input
                                                                    className="radio-input"
                                                                    id="declined-radio"
                                                                    name="filterRadio"
                                                                    type="radio"
                                                                    onChange={(event) => handleFilterChange(event, 'declined')}
                                                                    value={''}
                                                                    checked={filterType === 'declined'}
                                                                />
                                                                <span className="radio-label">Declined</span>
                                                            </Paper>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {
                adminRoles !== 'Line Manager Approval' && adminRoles !== 'Divisional Manager Approval' ?
                <div className="table-header2-cover-flex">
                    <div className="table-header2-cover-item">
                        <div className="table-data-cover-flex">
                            <div className="table-data-cover-item">S/N</div>
                            <div className="table-data-cover-item">Full Name</div>
                            <div className="table-data-cover-item">Units</div>
                            {
                                adminRoles === 'Fund Manager Approval' &&
                                <>
                                    <div className="table-data-cover-item">FM Approval Status</div>
                                    <div className="table-data-cover-item">FM Approval Officer</div>
                                </>
                            }
                            {
                                adminRoles === 'Payment Processor' &&
                                <>
                                    <div className="table-data-cover-item">PP Approval Status</div>
                                    <div className="table-data-cover-item">PP Approval Officer</div>
                                </>
                            }
                            <div className="table-data-cover-item">Fund Code</div>
                            <div className="table-data-cover-item">Date Received</div>
                            <div className="table-data-cover-item">Payment Sent Date</div>
                        </div>
                    </div>
                </div>:
                <div className="table-header2-cover-flex">
                    <div className="table-header2-cover-item">
                        <div className="table-data-cover-flex">
                            <div className="table-data-cover-item">S/N</div>
                            <div className="table-data-cover-item">Full Name</div>
                            <div className="table-data-cover-item">Units</div>
                            {
                                adminRoles === 'Line Manager Approval' &&
                                <>
                                    <div className="table-data-cover-item">LM Approval Status</div>
                                    <div className="table-data-cover-item">LM Approval Officer</div>
                                </>
                            }
                            {
                                adminRoles === 'Divisional Manager Approval' &&
                                <>
                                    <div className="table-data-cover-item">DH Approval Status</div>
                                    <div className="table-data-cover-item">DH Approval Officer</div>
                                </>
                            }
                            <div className="table-data-cover-item">Fund Code</div>
                            <div className="table-data-cover-item">Date Received</div>
                            {/* <div className="table-data-cover-item"></div> */}
                        </div>
                    </div>
                </div>
            }
        </DialogTitle>
    )
}