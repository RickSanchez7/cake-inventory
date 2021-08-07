import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SiCakephp } from 'react-icons/si';
import { trigger } from 'swr';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdClear } from 'react-icons/md';

import {
  StyledDeleteButton,
  StyledResponsiveTableContentContainer,
  StyledResponsiveTableIng,
  StyledResponsiveTableIngText,
  StyledResponsiveTableIngTitle,
  StyledResponsiveTableTitle,
  StyledResponsiveTableTitleContainer,
} from '../../styles/style';
import { url } from '../../pages';

type DataProps = {
  id: number;
  nome_bolo: string;
  ingredientes: string[];
  unidade: string[];
  quantidade: number[];
};

type Props = {
  cake: DataProps;
};

export const CustomTable = ({ cake }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpander = () => {
    if (!expanded) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  const handleCakeDelete = async (cake_name: string, cakeId: number) => {
    const { data } = await axios.post(`${url}/api/cake`, {
      data: { cake_name, id: cakeId },
    });

    if (data === 'OK') {
      trigger(`${url}/api/cakes`);
      toast.success('🚀 Bolo eliminado com sucesso!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('🧨 Ocorreu um erro!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <StyledResponsiveTableTitleContainer
        key={cake.id}
        onClick={toggleExpander}
      >
        <SiCakephp />
        <StyledResponsiveTableTitle className='uk-text-nowrap'>
          {cake.nome_bolo}
        </StyledResponsiveTableTitle>
      </StyledResponsiveTableTitleContainer>
      {expanded && (
        <StyledResponsiveTableContentContainer key={uuidv4()}>
          <StyledResponsiveTableIng>
            <StyledResponsiveTableIngTitle>
              Ingredientes
            </StyledResponsiveTableIngTitle>
            {cake.ingredientes.map(ing => (
              <StyledResponsiveTableIngText key={uuidv4()}>
                {ing}
              </StyledResponsiveTableIngText>
            ))}
          </StyledResponsiveTableIng>
          <StyledResponsiveTableIng>
            <StyledResponsiveTableIngTitle>
              Quantidade
            </StyledResponsiveTableIngTitle>
            {cake.quantidade.map(quan => (
              <StyledResponsiveTableIngText key={uuidv4()}>
                {quan}
              </StyledResponsiveTableIngText>
            ))}
          </StyledResponsiveTableIng>
          <StyledResponsiveTableIng>
            <StyledResponsiveTableIngTitle>
              Unidade de Medida
            </StyledResponsiveTableIngTitle>
            {cake.unidade.map(uni => (
              <StyledResponsiveTableIngText key={uuidv4()}>
                {uni === 'uni' ? 'unidade(s)' : uni}
              </StyledResponsiveTableIngText>
            ))}
          </StyledResponsiveTableIng>
          <StyledResponsiveTableIng>
            <StyledResponsiveTableIngTitle>
              Apagar Bolo
            </StyledResponsiveTableIngTitle>
            <StyledDeleteButton
              onClick={() => handleCakeDelete(cake.nome_bolo, cake.id)}
            >
              <MdClear />
            </StyledDeleteButton>
          </StyledResponsiveTableIng>
        </StyledResponsiveTableContentContainer>
      )}
    </>
  );
};
