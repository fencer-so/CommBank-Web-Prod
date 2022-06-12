import styled from "styled-components";

export type ModalProps = { isOpen: boolean };

export const Modal = styled.div<ModalProps>`
  width: 85%;
  max-width: 1000px;
  height: 85%;
  max-width: 1000px;
  background-color: ${({ theme }) => theme.modalBackground};
  border-radius: 2rem;
  padding: 8rem;
  z-index: 100;

  display: ${(props) => props.isOpen ? "flex" : "none"};
`

