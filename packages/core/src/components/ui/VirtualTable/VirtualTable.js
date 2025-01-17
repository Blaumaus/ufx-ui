import cx from 'classnames'
import _get from 'lodash/get'
import _isNumber from 'lodash/isNumber'
import _size from 'lodash/size'
import PropTypes from 'prop-types'
import React, { useState, memo } from 'react'
import {
  AutoSizer, Table, Column, defaultTableRowRenderer,
} from 'react-virtualized'

import * as Classes from '../../../common/classes'
import { getSortedData as getSortedDataHelper, sortData } from './VirtualTable.helpers'

const VirtualTable = (props) => {
  const {
    data, columns, onRowClick, rowHeight, headerHeight, defaultSortBy, defaultSortDirection, getSortedData, sortedDataPostProcessor, className, interactive, striped, headerClassName, noRowsRenderer, minTableWidth, rowRenderer,
  } = props
  const [sortBy, setSortBy] = useState(defaultSortBy)
  const [sortDirection, setSortDirection] = useState(defaultSortDirection)

  const classes = cx(Classes.VIRTUAL_TABLE_CONTAINER, className)

  const processedData = sortData(
    {
      data, columns, sortBy, sortDirection,
    },
    { getSortedData, sortedDataPostProcessor },
  )

  const onSort = ({
    sortDirection: postSortDirection,
    defaultSortDirection: propDefaultSortDirection,
    sortBy: postSortBy,
  }) => {
    const direction = sortDirection || propDefaultSortDirection

    if (postSortBy === sortBy && postSortDirection === direction) {
      return
    }

    setSortBy(postSortBy)
    setSortDirection(postSortDirection)
  }

  return (
    <div className={classes}>
      <div className={Classes.VIRTUAL_TABLE}>
        <AutoSizer>
          {({ width, height }) => (
            <Table
              height={height}
              width={_isNumber(minTableWidth) && width < minTableWidth ? minTableWidth : width}
              rowHeight={rowHeight}
              rowGetter={({ index }) => _get(processedData, index)}
              rowCount={_size(processedData)}
              rowClassName={cx({
                interactive,
                striped,
              })}
              onRowClick={onRowClick}
              headerHeight={headerHeight}
              disableHeader={false}
              sort={onSort}
              sortBy={sortBy}
              sortDirection={sortDirection}
              headerClassName={headerClassName}
              noRowsRenderer={noRowsRenderer}
              rowRenderer={rowRenderer}
            >
              {columns.map((c = {}) => (
                <Column
                  key={c.dataKey}
                  dataKey={c.dataKey}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...c}
                />
              ))}
            </Table>
          )}
        </AutoSizer>
      </div>
    </div>
  )
}

VirtualTable.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  columns: PropTypes.array, // eslint-disable-line
  rowHeight: PropTypes.number,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  sortedDataPostProcessor: PropTypes.func,
  getSortedData: PropTypes.func,
  defaultSortBy: PropTypes.string,
  defaultSortDirection: PropTypes.oneOf(['ASC', 'DESC']),
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  interactive: PropTypes.bool,
  striped: PropTypes.bool,
  noRowsRenderer: PropTypes.func,
  rowRenderer: PropTypes.func,
  minTableWidth: PropTypes.number,
}

VirtualTable.defaultProps = {
  data: [],
  columns: [],
  rowHeight: 22,
  headerHeight: 32,
  defaultSortBy: 'id',
  defaultSortDirection: 'ASC',
  onRowClick: () => { },
  sortedDataPostProcessor: () => { },
  getSortedData: getSortedDataHelper,
  className: null,
  headerClassName: null,
  interactive: false,
  striped: false,
  noRowsRenderer: () => {},
  rowRenderer: defaultTableRowRenderer,
  minTableWidth: null,
}

export default memo(VirtualTable)
