import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
// import  '../../../App.css';

const ShowTextEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: false, // Hide the toolbar
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
    'video',
  ];

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      readOnly // Set readOnly to true to hide the toolbar
      placeholder="Your amazing content here..."
      style={{ border: 'none' }}
      className="react-quill"
    />
  );
};

export default ShowTextEditor;
