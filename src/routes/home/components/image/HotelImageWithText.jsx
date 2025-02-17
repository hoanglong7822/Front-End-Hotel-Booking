import React, { useState, useEffect } from 'react';

const HotelImageWithText = () => {
  const [currentText, setCurrentText] = useState(0);
  const [slideUpKey, setSlideUpKey] = useState(0); // Thêm state để tái áp dụng animation
  const hotelDescriptions = [
    'Khách sạn 5 sao với không gian sang trọng',
    'Khám phá dịch vụ nghỉ dưỡng tuyệt vời',
    'Khách sạn với hồ bơi ngoài trời đẹp mắt',
    'Trải nghiệm nghỉ dưỡng đẳng cấp quốc tế',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => {
        const nextText = (prev + 1) % hotelDescriptions.length;
        setSlideUpKey((prev) => prev + 1); // Thay đổi key để tái áp dụng animation
        return nextText;
      });
    }, 1000); // Chuyển văn bản mỗi 1 giây

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-10 relative w-full h-96">
      {/* Ảnh nền */}
      <img
        src="images/Brown and White Simple Hotel Presentation.png"
        alt="Hotel"
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />

      {/* Overlay đen mờ */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
        {/* Chữ thay đổi tự động với hiệu ứng kéo lên */}
        <h2
          key={slideUpKey} // Sử dụng key để kích hoạt lại animation mỗi lần thay đổi
          className="text-4xl font-bold text-white text-center opacity-0 transform translate-y-8 animate-slideUp"
        >
          {hotelDescriptions[currentText]}
        </h2>
      </div>
    </div>
  );
};

export default HotelImageWithText;
