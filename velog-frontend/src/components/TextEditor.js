import React, { Component } from 'react';
import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as postAPI from '../lib/api/post';

const TextEditor = (props) => {
  const { value, onChange } = props;

  function imageHandler() {
    // input file tag 생성
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.png,.jpg,.jpeg');
    input.click();

    // input change
    input.onchange = (e) => {
      const files = e.target.files;
      const formData = new FormData();
      formData.append('files', files[0]);

      // file 등록
      const tempFile = postAPI.imgUpload(formData);
      tempFile.then((response) => {
        // 커서위치 및 fileSrno 얻기
        const fileSrno = response.fileSrno;
        const range = this.quill.getSelection();

        this.quill.insertEmbed(range.index, 'image', 'http://localhost:8002/master/api/v1/upload/img/' + fileSrno);
      });
    };
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
          ['clean'],
        ],
        handlers: {
          image: this.imageHandler,
        },
      },
    }),
    [],
  );

  const formats = [
    //'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ];

  return (
    <div style={{ height: '650px' }}>
      <ReactQuill
        style={{ height: '600px' }}
        theme="snow"
        modules={modules}
        formats={formats}
        value={value || ''}
        placeholder={'당신의 이야기를 적어보세요...'}
        onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
      />
    </div>
  );
};
export default TextEditor;
