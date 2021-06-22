import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  .logo {
    width: 38px;
  }

  .ant-layout-header {
    //display:block;
    //position:fixed;
    z-index: 100;
  }


 .ant-layout-content {
  padding-top: 0.5rem;
} 

.hideHeader { 
  position: fixed;
  background-color: #F2F5F7;
  z-index: 100;
}


.ant-card-cover > img{
  height: 300px;
  object-fit: fill;
}

/* .ant-form-inline {
    display: flex;
    flex-wrap: nowrap;
} */


`;
