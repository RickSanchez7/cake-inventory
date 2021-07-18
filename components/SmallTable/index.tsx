import React from 'react';
import { StyledAddButton, StyledThBody, StyledTr } from '../../styles/style';

type Props = {
  data: any;
  func: (id: number, nome: string) => void;
  icon: any;
};

export const SmallTable = ({ data, func, icon }: Props) => {
  return (
    <StyledTr>
      <StyledThBody>{data.nome_ingrediente}</StyledThBody>
      <StyledThBody>
        {data.unidade === 'uni' ? 'unidade' : data.unidade}
      </StyledThBody>
      <StyledThBody>
        <StyledAddButton onClick={() => func(data.id, data.nome_ingrediente)}>
          {icon}
        </StyledAddButton>
      </StyledThBody>
    </StyledTr>
  );
};
