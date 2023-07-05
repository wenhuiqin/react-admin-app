import { addBannerList } from '@/api/banner';
import { Button, Image, Input, Space } from 'antd';
import { useState, type FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface BannerAddProps {}
interface IAddBannerInterface {
  img: string
  link: string
  alt: string
}
const BannerAdd: FC<BannerAddProps> = () => {
  const navigate = useNavigate()

  const [link, setLink] = useState('')
  const [alt, setAlt] = useState('')
  const [img, setImg] = useState('')

  const imgRef = useRef<any>()

  const addBannerFn = () => {
    const data: IAddBannerInterface = {
      img, link, alt
    }
    addBannerList(data).then(() => {
      navigate(-1)
    })
  }

  return (
    <Space style={{ width: '100%', display: 'flex' }}>
      <Space direction="vertical" style={{ width: 500 }}>
        <Input placeholder='提示信息' value = { alt } onChange={ event => setAlt(event.target.value)}/>
        <Input placeholder='链接' value = { link } onChange={ event => setLink(event.target.value)}/>
        <input type="file" ref={imgRef} onChange={() => {
          const file = imgRef.current.files[0]
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function () {
            setImg(this.result as string)
          }
        }}/>
        <Input placeholder='图片地址' readOnly value={ img }></Input>
        <Button type='primary' onClick={ addBannerFn }>添加</Button>
      </Space>
      <div style={{ width: 400}}>
        <Image src={ img } style={{  minHeight: 200, border: '1px solid #ccc' }}/>
      </div>

    </Space>
  );
}

export default BannerAdd;