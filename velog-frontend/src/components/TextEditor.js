// import React from 'react';
// import PropTypes from 'prop-types';
// import ReactQuill from 'react-quill';

// // Added support for adding image from server and not base64 https://github.com/quilljs/quill/issues/2034
// // Add video not any video link:- https://github.com/zenoamaro/react-quill/issues/436
// const TextEditor = (props) => {
//   const formats = [
//     'header',
//     'bold',
//     'italic',
//     'underline',
//     'strike',
//     'blockquote',
//     'list',
//     'bullet',
//     'indent',
//     'link',
//     'image',
//     'align',
//     'color',
//     'background',
//   ];
//   const modules = {
//     toolbar: [
//       //[{ 'font': [] }],
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
//       ['link', 'image'],
//       [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
//       ['clean'],
//     ],
//     // clipboard: {
//     //   // toggle to add extra line breaks when pasting HTML:
//     //   matchVisual: false,
//     // },
//   };

//   // function imageHandler() {
//   //   console.log('custom image handler');
//   // }

//   const { onChange, value } = props;
//   return (
//     <div style={{ height: '650px' }}>
//       <ReactQuill
//         style={{ height: '600px' }}
//         theme="snow"
//         modules={modules}
//         formats={formats}
//         value={value || ''}
//         onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
//       />
//     </div>
//   );
// };

// // TextEditor.propTypes = {
// //   onChange: PropTypes.func.isRequired,
// //   name: PropTypes.string.isRequired,
// //   content: PropTypes.string.isRequired,
// // };

// export default TextEditor;

import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class TextEditor extends Component {
  constructor(props) {
    super(props);
  }

  modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ['clean'],
    ],
  };

  formats = [
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

  render() {
    const { value, onChange } = this.props;
    return (
      <div style={{ height: '650px' }}>
        <ReactQuill
          style={{ height: '600px' }}
          theme="snow"
          modules={this.modules}
          formats={this.formats}
          value={value || ''}
          onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
        />
      </div>
    );
  }
}
export default TextEditor;
