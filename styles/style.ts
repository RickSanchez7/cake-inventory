import styled from 'styled-components';

export const StyledIngredientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw -60px;
`;

export const StyledIngredientTitle = styled.h2`
  margin: 20px 30px;
  color: #00bfff;
  font-family: Poppins;
`;

export const StyledInputsContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 30px 10px;
  transition: all 0.2 linear;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin: 10px 30px;
  }
`;

export const StyledInput = styled.input`
  width: 200px;
  margin-left: 5px;
  border: none;
  outline: none;

  @media screen and (max-width: 768px) {
    width: 150px;
  }
`;

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  border: 1px solid #000;
  border-radius: 5px;
  width: 200px;
  margin-right: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 768px) {
    width: 180px;
  }

  @media screen and (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

export const StyledFilterLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  border: 1px solid #000;
  border-radius: 5px;
  width: 200px;
  margin-left: 50px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 768px) {
    width: 180px;
    margin-left: 0;
    margin-top: 10px;
  }
`;

export const StyledSelect = styled.select`
  padding: 5px;
  width: 80px;
  border: 1px solid #000;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  outline: none;
  border-radius: 5px;
  margin-right: 10px;
  font-family: Poppins;

  @media screen and (max-width: 768px) {
    width: 60px;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

export const StyledButton = styled.button`
  display: inline-block;
  padding: 8px 12px;
  border-radius: 5px;
  text-decoration: none;
  font-family: Poppins;
  font-weight: 300;
  color: #fff;
  background-color: #00bfff;
  text-align: center;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #4095c6;
  }
`;

export const StyledDeleteButton = styled.button`
  display: flex;
  padding: 5px 12px;
  border-radius: 5px;
  margin: 2px auto;
  background-color: #ff0000;
  color: #fff;
  font-size: 14px;
  font-family: Poppins;
  border: none;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    background-color: #8b0000;
  }
`;

export const StyledTable = styled.table`
  border-spacing: 0;
  /* border: 1px solid #c0c0c0; */
  border: 1px solid #7cb9e8;
  margin: 15px 30px;
  width: 750px;
  transition: all 0.2 linear;

  @media screen and (max-width: 768px) {
    width: 250px;
  }
`;

export const StyledTrTitle = styled.tr`
  /* background-color: #c0c0c0; */
  background-color: #7cb9e8;
  transition: all 0.2 linear;
`;

export const StyledThTitle = styled.th`
  /* background-color: #c0c0c0; */
  /* background-color: #7cb9e8; */
  width: 250px;
  height: 35px;
  color: #505050;
  font-family: Poppins;
  transition: all 0.2 linear;

  @media screen and (max-width: 768px) {
    width: 150px;
  }
`;
export const StyledThBody = styled.th`
  text-align: center;
  color: #505050;
  font-family: Poppins;
  font-weight: 300;
  /* border-right: 1px solid #ddd; */
  border-right: 1px solid #7cb9e8;
  transition: all 0.2 linear;

  &:last-child {
    border-right: none;
  }
`;

export const StyledTr = styled.tr`
  &:nth-child(even) {
    /* background-color: #f2f2f2; */
    background-color: #f0f8ff;
  }
`;
