import { FC,useState } from 'react';
import ReactMarkdown from 'react-markdown'
import MdEditor from 'react-markdown-editor-lite'

import 'react-markdown-editor-lite/lib/index.css'


interface MdProps {}

const Md: FC<MdProps> = () => {
  const [content,setContent] = useState('')
  return (
    <div>
      <MdEditor
        style={{height:'500px'}}
        renderHTML={text=><ReactMarkdown>{text}</ReactMarkdown>}
        onChange={({html,text})=>{
          setContent(html)
        }} />
    </div>
  );
}

export default Md;
