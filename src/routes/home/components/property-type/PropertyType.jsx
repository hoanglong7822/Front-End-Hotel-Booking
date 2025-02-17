import React, { useState, useEffect } from 'react';

const PropertyType = ({ propertyType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const useResponsive = () => {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Lắng nghe sự kiện thay đổi kích thước
      window.addEventListener('resize', handleResize);

      // Xóa bỏ sự kiện khi component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return windowSize;
  };
  const [resIndex, setResIndex] = useState(4);
  const { width } = useResponsive();
  useEffect(() => {
    if (width < 1024) {
      setResIndex(2);
    }
  }, [width]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === propertyType.length - 4 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [propertyType.length]);

  return (
    <div className="container mt-8 px-2 md:px-0">
      <div className="text-3xl mb-4 font-medium text-slate-700">
        <h1> Browse by property type</h1>
      </div>
      <div className="">
        <div className=" flex gap-2 transition-transform ease-in-out bg-white shadow-lg rounded-lg overflow-hidden">
          {propertyType
            .slice(currentIndex, currentIndex + resIndex)
            .map((room) => (
              <div className="w-1/2 md:w-1/4 h-full hover:scale-105 duration-500">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-48 "
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-center text-gray-800">
                    {room.name}
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyType;
