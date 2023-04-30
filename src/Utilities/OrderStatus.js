export default function OrderStatus(status) {
    switch (status) {
        case 0:
            return 'รอหาผู้ส่ง';
        case 25:
            return 'กำลังเตรียมอาหาร';
        case 50:
            return 'กำลังขนส่ง';
        case 100:
            return 'ส่งสำเร็จ';
        default:
            return '๊Unknown';
    }
}