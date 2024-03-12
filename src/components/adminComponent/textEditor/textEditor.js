import React from 'react'
// RichTextEditor.js
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
const TextEditor = ({ value, onChange }) => {
  
    
    const modules = {
        toolbar: false, // Hide the toolbar
        clipboard: {
          matchVisual: false,
        },
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
        [{ color: [] }, { background: [] }],
        ['code-block'],
        [{ script: 'sub' }, { script: 'super' }],
        ['formula'],
        ['table'],
     
        ['code'],
        ['hr'],
        ['video'], // Custom video option
      ],
      clipboard: {
        matchVisual: false,
      },
      
    };
  
    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet',
      'link', 'image',
      'color', 'background', 'code-block',
      'script', 'formula',
      'table',  'code', 'hr',
      'video', // Added format for video
    ];
  
  
  
    return (
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Write something amazing..."
        
      />
    );
  };

export default TextEditor