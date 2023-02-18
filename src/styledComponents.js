import styled from 'styled-components'

export const LikeButton = styled.button`
  color: ${props => (props.likeBtn ? '#2563eb' : '#64748b')};
  font-family: 'Roboto';
  height: '30px';
  width: '100px';
  border: '0px';
  margin: '20px';
`
export const BannerContainer = styled.div`
  width: 100%;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  height: 40vh;
  background-size: cover;
  padding: 30px;
`
