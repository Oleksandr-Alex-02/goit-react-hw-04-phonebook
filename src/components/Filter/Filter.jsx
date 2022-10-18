import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filter, contackFilter }) => (
    <>
        <label>
            Find contacts by name
        </label>
        <input
            type="text"
            value={filter}
            onChange={contackFilter}
        />
    </>
);

Filter.propTypes = {
    contackFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
};

export default Filter;