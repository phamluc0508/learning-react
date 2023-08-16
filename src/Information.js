import App from './App';

export default function Information() {
    const title = "Thông tin người liên hệ"
    const items = [{ label: 'Họ tên', data: '111' },
    { label: 'Danh xưng', data: 'Mr.' },
    { label: 'Số điện thoại', data: '111' },
    { label: 'Email', data: '' },
    { label: 'Giới tính', data: 'Nam' },
    { label: 'Chức vụ', data: '' },
    { label: 'Nhân sự phụ trách', data: 'NHQ' },
    { label: 'Mô tả', data: '' }
    ]
    return (
        <App items={items} title={title} />
    )
}