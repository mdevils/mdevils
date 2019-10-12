import {useState} from 'react';
import styled from 'styled-components';
import {Filters} from '../../components/filters';
import * as React from 'react';
import {chronology, ChronologyItem} from '../../data/chronology';

const filterNames = {
  experience: 'Experience',
  education: 'Education',
  public: 'Publications'
};

const filterColors = {
  experience: '#527569',
  education: '#396884',
  public: '#8A3621'
};

export function Chronology() {
  const [filterStatuses, setStatuses] = useState({
    public: true,
    experience: true,
    education: true
  });

  return (
    <>
      <Filters
        colors={filterColors}
        names={filterNames}
        statuses={filterStatuses}
        onStatusesChange={setStatuses as any}
      />
      <ChronologyItems chronology={chronology} />
    </>
  )
}

const ChronologyItemsWrapper = styled.div``;

function ChronologyItems({chronology}: {chronology: ChronologyItem[]}) {
  return (
    <ChronologyItemsWrapper>
      {chronology.map((item, index) => (
        <Item item={item} key={index} />
      ))}
    </ChronologyItemsWrapper>
  )
}

const ChronologyItemWrapper = styled.div``;
const ItemTitle = styled.div``;

function Item({item}: {item: ChronologyItem}) {
  return (
    <ChronologyItemWrapper>
      <ItemTitle>{item.title}</ItemTitle>
    </ChronologyItemWrapper>
  );
}
