import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
  .logo {
    width: 38px;
  }

  .ant-layout-header {
    //display:block;
    //position:fixed;
    width:100%;
    align-items:center;
    background:#F8F9FA;
    backdrop-filter: blur(15px);
    padding: 0;
    
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    z-index: 100;

  }


  .ant-layout-content {
    display:block;
    padding: 0rem 10rem 0rem; //중간에 하나만 있으면 좌우



}

.ant-card{

}

.ant-card-cover > img{
  height: 300px;
  object-fit: fill;
}

.ant-row{
  grid-gap: 3rem;
}

.ant-form-inline {
    display: flex;
    flex-wrap: nowrap;
}


`;
