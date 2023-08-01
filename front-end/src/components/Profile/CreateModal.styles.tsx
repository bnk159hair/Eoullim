import tw from 'twin.macro';
import styled from 'styled-components'

export const ModalOverlay = styled.div`
${tw `fixed top-0 left-0 w-full h-full bg-opacity-60 bg-black z-10
`}
`;

export const ModalContent = styled.div`
${tw `fixed top-1/2 left-1/2 transform
  -translate-x-1/2
  -translate-y-1/2
  bg-white
  p-4
  rounded
  z-20`
}`;