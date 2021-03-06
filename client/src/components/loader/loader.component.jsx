import React from 'react';
import styled from 'styled-components';
import * as C from '../../style';
import SyncLoader from "react-spinners/SyncLoader";
import { useDispatch } from 'react-redux';
import { clearError } from '../../redux/weather/weather.actions';

import { motion, useAnimation } from 'framer-motion';

export const Container = styled.div`
  height: 15px;
  width: 250px;
  position: fixed;
  bottom: 30px;
  left: 18px;
  z-index: 69;
`;

export const ErrorContainer = styled(motion.div)`
  background-color: ${C.Gray};
  border-radius: 1px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  position: absolute;
`;

export const Message = styled.span`
  font-size: 14px;
  color: ${C.White};
  font-weight: lighter;
`;

export const Close = styled.div`
  font-size: 14px;
  color: ${C.White};
  padding: 5px 10px;
  cursor: pointer;
`;

export const LoaderContainer = styled(motion.div)`
  position: absolute;
`;

const variants = {
  visible: {
    top: 0,
    transition: {
      type: "spring",
      duration: 0.5
    }
  },
  hidden: {
    top: "50px",
    transition: {
      type: "spring",
      duration: 0.5,
      delay: 0
    }
  }
}

const Loader = ({ loading, error }) => {
  const [loaderControls, errorControls] = [useAnimation(), useAnimation()];

  loading ? loaderControls.start("visible") : loaderControls.start("hidden");
  error ? errorControls.start("visible") : errorControls.start("hidden");

  const dispatch = useDispatch();

  const handleClose = async () => {
    await errorControls.start("hidden")
    dispatch(clearError());
  }

  return (
    <Container>
      <LoaderContainer variants={variants} initial="hidden" animate={loaderControls}>
        <SyncLoader color={C.White} size={8} />
      </LoaderContainer>
      <ErrorContainer variants={variants} initial="hidden" animate={errorControls}>
        <Message>{error ? (error.message ? error.message : "There was an error :(") : "There was an error :("}</Message>
        <Close onClick={handleClose}>✕</Close>
      </ErrorContainer>
    </Container>
  )
}

export default Loader;