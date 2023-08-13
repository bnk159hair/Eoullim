import styled from 'styled-components';
import soundon from '../../assets/ecc/soundon.png'
import soundoff from '../../assets/ecc/soundoff.png'

export const SoundOn = styled.div`
    width: 40px;
    height: 40px;
    background-image: url(${soundon});
    background-size: cover;
`

export const SoundOff = styled.div`
    width: 40px;
    height: 40px;
    background-image: url(${soundoff});
    background-size: cover;
`