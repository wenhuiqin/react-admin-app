import { FC,useState } from 'react';
import { Space,Input,Button,Drawer } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css'

interface BraftProps {}

const Braft: FC<BraftProps> = () => {
  const [editorState,setEditorState] = useState('')
  const [title,setTitle] = useState('')

  const changeHandler = (editorState:any)=>{
    setEditorState(editorState.toHTML())
  }

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Space direction='vertical' style={{width:'100%',height:600,overflow:'hidden'}}>
      <Button type="primary" onClick={showDrawer}>
        点击预览
      </Button>
      <Input placeholder='文章标题' value={title} onChange={event=>setTitle(event.target.value)}/>
      <BraftEditor value={editorState} onChange={changeHandler} />
      <Drawer 
        title="内容预览" 
        placement="right" 
        onClose={onClose}
        open={open}>
        <h1 style={{border:'1px solid gray'}}>{title}</h1>
        <div style={{border:'1px solid gray',height:600}} dangerouslySetInnerHTML={{__html:editorState}}></div>
      </Drawer>
    </Space>
  );
}

export default Braft;
