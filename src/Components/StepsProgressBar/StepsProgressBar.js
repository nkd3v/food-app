import './StepsProgressBar.css'

function StepsProgressBar({ step }) {
    return (
        <ul className="step-wizard-list">
            <li className={`step-wizard-item${step === 0 ? " current-item" : " "}`}>
                <span className="progress-count">1</span>
                <span className="progress-label">รอหาผู้ส่ง</span>
            </li>
            <li className={`step-wizard-item${step === 25 ? " current-item" : " "}`}>
                <span className="progress-count">2</span>
                <span className="progress-label">กำลังเตรียมอาหาร</span>
            </li>
            <li className={`step-wizard-item${step === 50 ? " current-item" : " "}`}>
                <span className="progress-count">3</span>
                <span className="progress-label">กำลังขนส่ง</span>
            </li>
            <li className={`step-wizard-item${step === -2 ? " current-item" : " "}`}>
                <span className="progress-count">4</span>
                <span className="progress-label">ส่งสำเร็จ</span>
            </li>
        </ul>
    )
}

export default StepsProgressBar