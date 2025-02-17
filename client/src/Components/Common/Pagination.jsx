import React from "react";
import PropTypes from "prop-types";
import { Pagination as MUIPagination, Stack } from "@mui/material";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  ...props
}) => {
  return (
    <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
      <MUIPagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
        color="primary"
        {...props}
      />
    </Stack>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired, // Поточна сторінка
  totalPages: PropTypes.number.isRequired, // Загальна кількість сторінок
  onPageChange: PropTypes.func.isRequired, // Функція для обробки зміни сторінки
  siblingCount: PropTypes.number, // Кількість сусідніх сторінок, які показуються поряд із поточною
  boundaryCount: PropTypes.number, // Кількість сторінок на краях (початок і кінець)
};

export default Pagination;