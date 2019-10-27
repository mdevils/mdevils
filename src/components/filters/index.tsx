import {useCallback} from 'react';
import styled from 'styled-components';
import * as React from 'react';

type FiltersColors = {
  [filterName: string]: string;
};

type FiltersNames = {
  [filterName: string]: string;
};

type FiltersStatuses = {
  [filterName: string]: boolean;
};

const FiltersWrapper = styled.div`
  margin: 20px 0;
`;


export function Filters({
  colors,
  names,
  statuses,
  onStatusesChange
}: {
  colors: FiltersColors,
  names: FiltersNames,
  statuses: FiltersStatuses,
  onStatusesChange: (statuses: FiltersStatuses) => void
}) {
  return (
    <FiltersWrapper>
      {Object.keys(names).map((status) => (
        <Filter
          name={names[status]}
          color={colors[status]}
          status={status}
          statuses={statuses}
          onStatusesChange={onStatusesChange}
          key={status}
        />
      ))}
    </FiltersWrapper>
  );
}


const FilterWrapper = styled.label<{color: string, checked: boolean}>`
  cursor: pointer;
  display: inline-block;
  background-color: ${({color}) => color};
  padding: 3px 10px;
  font-weight: 400;
  font-size: 14px;
  margin: 2px 0;
  transition: opacity 0.2s linear;
  ${({checked}) => checked ? '' : 'opacity: 0.5;'}
`;

const FilterCheckbox = styled.input`
  margin-right: 5px;
  position: relative;
`;

const FilterName = styled.span`
  color: white;
`;

function Filter({
  statuses,
  status,
  name,
  color,
  onStatusesChange
}: {
  statuses: FiltersStatuses,
  status: string,
  name: string,
  color: string,
  onStatusesChange: (statuses: FiltersStatuses) => void
}) {
  const onChange = useCallback((e: React.ChangeEvent) => {
    onStatusesChange({...statuses, [status]: (e.target as HTMLInputElement).checked})
  }, [onStatusesChange, statuses, status]);

  return (
    <>
      <FilterWrapper tabIndex={-1} color={color} checked={statuses[status]}>
        <FilterCheckbox type='checkbox' checked={statuses[status]} onChange={onChange} />
        <FilterName>{name}</FilterName>
      </FilterWrapper>
      {' '}
    </>
  );
}
