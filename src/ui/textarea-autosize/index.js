import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

// The same as TextareaAutosize, but with moving caret to the end after focus()
function TextAreaAutosize(props) {
    const textAreaRef = React.useRef();

    React.useEffect(() => {
        if (!textAreaRef.current) return;
        const el = textAreaRef.current;
        if (typeof el.selectionStart == 'number') {
            el.selectionStart = el.selectionEnd = el.value.length;
        } else if (typeof el.createTextRange != 'undefined') {
            el.focus();
            var range = el.createTextRange();
            range.collapse(false);
            range.select();
        }
    }, []);

    return typeof jest !== 'undefined' ? (
        <textarea ref={(tag) => (textAreaRef.current = tag)} {...props} />
    ) : (
        <TextareaAutosize ref={(tag) => (textAreaRef.current = tag)} {...props} />
    );
}

export default TextAreaAutosize;
