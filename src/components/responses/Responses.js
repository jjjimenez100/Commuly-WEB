import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, Input } from 'components';
import DataTable from 'react-data-table-component';
import { filterMatchingObjectProperties } from '../../utils/search';
import { QUESTION_CONTENT_RESPONSE_MAPPING } from '../../constants/card';

const columns = [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
  },
  {
    name: 'Responded Date',
    selector: 'respondedDate',
    sortable: true,
  },
  {
    name: 'Answer',
    selector: 'answer',
    sortable: true,
  },
];

const defaultStyles = {
  header: {
    style: {
      fontSize: '18px',
      paddingLeft: '0px',
      paddingTop: '15px',
    },
  },
  headCells: {
    style: {
      fontSize: '16px',
      paddingLeft: '0px',
    },
  },
  cells: {
    style: {
      fontSize: '14px',
      paddingLeft: '0px',
    },
  },
  pagination: {
    style: {
      fontSize: '12px',
    },
  },
};

/**
 * Further improvement: Convert this to a debounced search every 300ms
 * and place the state to its own mobx store
 */
class Responses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
    };

    this.search = this.searchResponses;
  }

  handleSearchChange = e => {
    this.setState({
      searchQuery: e.target.value,
    });
    this.search();
  };

  searchResponses = () => {
    const { cardData } = this.props;
    const { questionCardType } = cardData;
    const { responses } = cardData[QUESTION_CONTENT_RESPONSE_MAPPING[questionCardType]];
    const { searchQuery } = this.state;

    const filteredResponses = filterMatchingObjectProperties(responses, searchQuery);

    return filteredResponses;
  };

  render() {
    const { customStyles, handleClose, isOpen, cardData = {} } = this.props;
    const { questionCardType = '' } = cardData;
    const { question = '', responses = [] } =
      cardData[QUESTION_CONTENT_RESPONSE_MAPPING[questionCardType]] || {};
    const { searchQuery } = this.state;

    return (
      <>
        <Modal isOpen={isOpen} title="View Responses" handleClose={handleClose}>
          <ModalBody>
            <Input
              type="text"
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
              placeholder="Search..."
              name="textSize"
              min={10}
              max={40}
            />
            <DataTable
              title={question}
              columns={columns}
              customStyles={customStyles}
              data={searchQuery.trim() ? this.search() : responses}
              pagination
              persistTableHead
              highlightOnHover
            />
          </ModalBody>
        </Modal>
      </>
    );
  }
}

Responses.defaultProps = {
  customStyles: defaultStyles,
  isOpen: false,
};

Responses.propTypes = {
  cardData: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  customStyles: PropTypes.object,
};

export default Responses;
