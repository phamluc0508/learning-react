import './App.scss';
import { Icon } from '@iconify/react';
import { useState } from 'react';

function App(props) {
  const [state, setState] = useState(true);
  const onClick = () => {
    state ? setState(false) : setState(true);
  }
  // const items = [{ label: 'Họ tên', data: '111' },
  // { label: 'Danh xưng', data: 'Mr.' },
  // { label: 'Số điện thoại', data: '111' },
  // { label: 'Email', data: '' },
  // { label: 'Giới tính', data: 'Nam' },
  // { label: 'Chức vụ', data: '' },
  // { label: 'Nhân sự phụ trách', data: 'NHQ' },
  // { label: 'Mô tả', data: '' }
  // ]
  const { items, title } = props
  return (
    <div class='collapse'>
      <button onClick={onClick} className='button'>
        <span className='button_icon' >
          {
            state ? (<Icon icon="bx:bx-chevron-up" />)
              :
              (<Icon icon="bx:bx-chevron-down" />)
          }
        </span>
        <span className='button_title'>{title}</span>
      </button>
      {
        state ?
          (<div className='detail'>
            {
              items.map((item, index) => {
                return (<>
                  {item.label === 'Mô tả' && index % 2 === 1 ?
                    <>
                      <div className='detail_infor1'>
                      </div>
                      <div className='detail_infor2'>
                        <div className='detail_infor2_head'>{item.label}</div>
                        <div className='detail_infor2_data'>{item.data}</div>
                      </div>
                    </> : <>
                      <div className='detail_infor1'>
                        <div className='detail_infor1_head'>{item.label}</div>
                        <div className='detail_infor1_data'>{item.data}</div>
                      </div>
                    </>}
                </>)


              }
              )
            }
          </div>)
          :
          null
      }

    </div>
  );
}

export default App;
