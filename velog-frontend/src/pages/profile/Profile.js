import React from 'react';
import AppLayout from '../../components/AppLayout';
import {
  StyledImgRemoveButton,
  StyledImgUploadButton,
  StyledProfileImg,
  StyledProfileModal,
  StyledSubDetailDiv,
  StyledUserDescBottomSection,
  StyledUserDescTopSection,
  StyledUserInfoDiv,
  StyledUserThubnailDiv,
} from './style';

import './style.css';
import { Form } from 'antd';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { imgPutAction } from '../../reducers/user';

const Profile = () => {
  const { principal } = useSelector(({ auth }) => ({
    principal: auth.principal,
  }));

  const dispatch = useDispatch();

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onSubmitForm = useCallback(() => {}, []);
  const onChangeImages = useCallback((e, userId) => {
    console.log('images', e.target.files);
    console.log('principalId', userId);
    let files = e.target.files;
    let filesArr = Array.prototype.slice.call(files);

    const imageFormData = new FormData();

    filesArr.forEach((f) => {
      if (!f.type.match('image.*')) {
        alert('이미지를 등록해야 합니다.');
        return;
      }

      let profileImageForm = document.querySelector('#profile-image_form')[0];

      console.log('profileimg', profileImageForm);

      //let data = new FormData(profileImageForm);
      //console.log('data', data);
      imageFormData.append('image', f);

      console.log('imageFormData', imageFormData);

      //dispatch(imgPutAction({ userId, data }));
    });

    // const data = new FormData(); //imageFormData
    // [].forEach.call(e.target.files, (f) => {
    //   data.append('image', f);
    //   console.log('f', f);
    // });

    // console.log(data);
    //객체로 받을 때는 변수명 일치 신경쓰셈
  }, []);

  return (
    <>
      <AppLayout>
        {principal && (
          <StyledUserDescTopSection>
            <StyledUserThubnailDiv>
              <StyledProfileImg src="/images/userImage.jpg" alt="" />
              <Form encType="multipart/form-data" onFinish={onSubmitForm} id="profile-image_form">
                <input
                  type="file"
                  name="image"
                  multiple
                  hidden
                  ref={imageInput}
                  onChange={(e) => onChangeImages(e, principal.id)}
                />
                <StyledImgUploadButton onClick={onClickImageUpload}>이미지 업로드</StyledImgUploadButton>
              </Form>
              <StyledImgRemoveButton>이미지 제거</StyledImgRemoveButton>
            </StyledUserThubnailDiv>
            <StyledUserInfoDiv>
              <h2>{principal.username}</h2>
              <p>이 페이지 중 벨로그 제목, 소셜 정보, 이메일 주소 등은 미구현 상태입니다. </p>
              {/* <button className="sc-fcdeBU eZBjgD">수정</button> */}
            </StyledUserInfoDiv>
          </StyledUserDescTopSection>
        )}

        <StyledUserDescBottomSection>
          <StyledSubDetailDiv>
            <div className="wrapper">
              <div className="title-wrapper">
                <h3>벨로그 제목</h3>
              </div>
              <div className="block-for-mobile">
                <div className="contents">stella6767.log</div>
                <div className="edit-wrapper">
                  <button className="updateBtn">수정</button>
                </div>
              </div>
            </div>
          </StyledSubDetailDiv>
          <StyledSubDetailDiv>
            <div className="wrapper">
              <div className="title-wrapper">
                <h3>소셜 정보</h3>
              </div>
              <div className="block-for-mobile">
                <div className="contents">
                  <ul className="sc-fZwumE gvdRTK">
                    <li>
                      <span>https://github.com/stella6767</span>
                    </li>
                    <li>
                      <span>https://blog.naver.com/alsrb9434</span>
                    </li>
                  </ul>
                </div>
                <div className="edit-wrapper">
                  <button className="updateBtn">수정</button>
                </div>
              </div>
            </div>
          </StyledSubDetailDiv>
          <StyledSubDetailDiv>
            <div className="wrapper">
              <div className="title-wrapper">
                <h3>이메일 주소</h3>
              </div>
              <div className="block-for-mobile"></div>
            </div>
            <div className="description">회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다.</div>
          </StyledSubDetailDiv>
          <StyledSubDetailDiv>
            <div className="wrapper">
              <div className="title-wrapper">
                <h3>회원 탈퇴</h3>
              </div>
              <div className="block-for-mobile">
                <button color="red" className="sc-dnqmqq dGwAmB">
                  회원 탈퇴
                </button>
              </div>
            </div>
          </StyledSubDetailDiv>
        </StyledUserDescBottomSection>
      </AppLayout>
    </>
  );
};

export default Profile;
