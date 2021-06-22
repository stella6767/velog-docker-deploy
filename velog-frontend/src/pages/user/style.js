import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle` 

  .name{
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: bold;
    color: rgb(33, 37, 41);

  }

  .description {
    white-space: pre-wrap;
    font-size: 1.125rem;
    line-height: 1.5;
    margin-top: 0.25rem;
    color: rgb(73, 80, 87);
    letter-spacing: -0.004em;
  }

  .line-height-div{

    background: rgb(233, 236, 239);
    width: 100%;
    height: 1px;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }




`;

export const StyledUserContainerDiv = styled.div`
  width: 768px;
  margin-left: auto;
  margin-right: auto;
`;

export const StyledUserVelogDiv = styled.div`
  margin-top: 5.625rem;
`;

export const StyledUserTopDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledUserDescDiv = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  margin-left: 1rem;
`;

export const StyledUserProfileImg = styled.img`
  display: block;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: rgb(0 0 0 / 6%) 0px 0px 4px 0px;
`;
