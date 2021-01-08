import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin, keyword }) => {
    return (
        <Pagination>
        {Array(pages).fill(0).map((ele, idx) => (
          <LinkContainer
            key={idx + 1}
            to={keyword ? `/search/${keyword}/page/${idx + 1}` : isAdmin ?  `/admin/products/${idx + 1}` : `/page/${idx + 1}`}
          >
            <Pagination.Item active={idx + 1 === Number(page)}>{idx + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
}

export default Paginate;

