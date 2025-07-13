import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Search, MapPin, Users, Briefcase, BookOpen, Heart, DollarSign, Phone, ArrowLeft, X } from 'lucide-react';
import socialResourcesData from './data/socialResources';
import categoriesData from './data/categories';
import municipalitiesDataData from './data/municipalities';

const OkinawaSocialResourcesApp = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);

  const rotationAngle = useRef(0);
  const dragInfo = useRef({ isDragging: false, startAngle: 0, startRotation: 0, startX: 0, startY: 0, hasDragged: false });
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const socialResources = useMemo(() => socialResourcesData, []);
  const categories = useMemo(() => categoriesData, []);
  const municipalitiesData = useMemo(() => municipalitiesDataData, []);

  const screenCenter = useMemo(() => ({ x: windowSize.width / 2, y: windowSize.height / 2 }), [windowSize]);
  
  const displayCenter = useMemo(() => {
      return selectedCategory
          ? { x: screenCenter.x, y: screenCenter.y - screenCenter.y * 0.05 }
          : screenCenter;
  }, [screenCenter, selectedCategory]);

  const positionedCategories = useMemo(() => {
    const radius = Math.min(windowSize.width, windowSize.height) * 0.35;
    return categories.map((category, index) => {
      const angle = (index / categories.length) * 2 * Math.PI - Math.PI / 2 + rotationAngle.current;
      return { ...category, position: { x: displayCenter.x + radius * Math.cos(angle), y: displayCenter.y + radius * Math.sin(angle) } };
    });
  }, [categories, displayCenter, windowSize, rotationAngle.current]);

  const filteredResources = useMemo(() => {
    if (!selectedCategory) return [];
    return socialResources.filter(resource => resource.category === selectedCategory);
  }, [selectedCategory, socialResources]);

  const positionedResources = useMemo(() => {
    const radius = Math.min(windowSize.width, windowSize.height) * 0.28;
    return filteredResources.map((resource, index) => {
      const angle = (index / filteredResources.length) * 2 * Math.PI - Math.PI / 2 + rotationAngle.current;
      return { ...resource, position: { x: displayCenter.x + radius * Math.cos(angle), y: displayCenter.y + radius * Math.sin(angle) } };
    });
  }, [filteredResources, displayCenter, windowSize, rotationAngle.current]);

  const handleMouseDown = useCallback((e) => {
    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
    const startX = clientX - displayCenter.x;
    const startY = clientY - displayCenter.y;
    const startAngle = Math.atan2(startY, startX);
    dragInfo.current = { isDragging: true, startAngle, startRotation: rotationAngle.current, startX: clientX, startY: clientY, hasDragged: false };
  }, [displayCenter]);

  const handleMouseMove = useCallback((e) => {
    if (!dragInfo.current.isDragging) return;

    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

    const dx = clientX - dragInfo.current.startX;
    const dy = clientY - dragInfo.current.startY;
    if (!dragInfo.current.hasDragged && Math.sqrt(dx * dx + dy * dy) > 5) {
        dragInfo.current.hasDragged = true;
    }

    if (dragInfo.current.hasDragged) {
        const currentX = clientX - displayCenter.x;
        const currentY = clientY - displayCenter.y;
        const currentAngle = Math.atan2(currentY, currentX);
        const angleDiff = currentAngle - dragInfo.current.startAngle;
        rotationAngle.current = dragInfo.current.startRotation + angleDiff;
        forceUpdate(c => c + 1);
    }
  }, [displayCenter]);

  const handleMouseUp = useCallback(() => {
    if (dragInfo.current.isDragging) {
        setTimeout(() => {
            dragInfo.current.isDragging = false;
            dragInfo.current.hasDragged = false;
        }, 0);
    }
  }, []);

  const handleNodeClick = (action) => {
      if (!dragInfo.current.hasDragged) {
          action();
      }
  }

  const CategoryNode = ({ item, onClick }) => {
    const IconComponent = item.icon;
    return (
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 hover:scale-110"
        style={{ left: `${item.position.x}px`, top: `${item.position.y}px`, zIndex: 10 }}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => handleNodeClick(onClick)}
      >
        <div className={`${item.color} w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow`}>
          <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
        </div>
        <div className="text-center mt-2 text-sm sm:text-base md:text-lg font-medium text-gray-700 max-w-[5rem] sm:max-w-24 md:max-w-28">
          {item.name}
        </div>
      </div>
    );
  };

  const ResourceNode = ({ item, onClick }) => {
    const IconComponent = item.icon;
    return (
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 hover:scale-110"
        style={{ left: `${item.position.x}px`, top: `${item.position.y}px`, zIndex: 10 }}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => handleNodeClick(onClick)}
      >
        <div className={`${item.color} w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow`}>
          <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
        </div>
        <div className="text-center mt-2 text-xs sm:text-sm md:text-base font-medium text-gray-700 max-w-[4rem] sm:max-w-20 md:max-w-24 leading-tight">
          {item.name}
        </div>
      </div>
    );
  };

  const CenterNode = ({ onClick, isCategorySelected }) => (
    <div className="absolute" style={{ top: displayCenter.y, left: displayCenter.x, transform: 'translate(-50%, -50%)', zIndex: 20 }}>
      <div
        className={`bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-2xl hover:shadow-3xl
          ${isCategorySelected ? 'w-[64px] h-[64px] sm:w-24 sm:h-24 md:w-32 md:h-32' : 'w-[89.6px] h-[89.6px] sm:w-32 sm:h-32 md:w-40 md:h-40'}`
        }
        onClick={() => handleNodeClick(onClick)}
      >
        <div className="text-center">
          <Search className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white mx-auto mb-1 sm:mb-2" />
          <div className="text-white text-sm sm:text-lg font-bold leading-tight">
            沖縄22歳向け<br />社会資源
          </div>
        </div>
      </div>
    </div>
  );

  const ConnectionLine = ({ from, to }) => (
    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#d1d5db" strokeWidth="2" strokeDasharray="6,6" className="opacity-60" />
    </svg>
  );

  if (selectedResource) {
    const isLocationSelectionNeeded = selectedResource.needsLocationSelection;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <button
            onClick={() => {
              if (isLocationSelectionNeeded && selectedMunicipality) {
                setSelectedMunicipality(null);
              } else if (isLocationSelectionNeeded && selectedRegion) {
                setSelectedRegion(null);
              } else {
                setSelectedResource(null);
                setSelectedRegion(null); // Reset region when going back from resource details
                setSelectedMunicipality(null); // Reset municipality when going back from resource details
              }
            }}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            戻る
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{selectedResource.name}</h1>

          {isLocationSelectionNeeded && !selectedRegion && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">地域を選択してください</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(municipalitiesData).map(region => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className="bg-blue-500 text-white py-3 px-4 rounded-lg shadow hover:bg-blue-600 transition-colors"
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isLocationSelectionNeeded && selectedRegion && !selectedMunicipality && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">{selectedRegion}の市町村を選択してください</h2>
              <div className="grid grid-cols-2 gap-4">
                {municipalitiesData[selectedRegion].map(municipality => (
                  <button
                    key={municipality}
                    onClick={() => setSelectedMunicipality(municipality)}
                    className="bg-green-500 text-white py-3 px-4 rounded-lg shadow hover:bg-green-600 transition-colors"
                  >
                    {municipality}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(!isLocationSelectionNeeded || (isLocationSelectionNeeded && selectedRegion && selectedMunicipality)) && (
            <div className="mt-8 bg-gray-50 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">詳細情報</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {typeof selectedResource.getDetails === 'function'
                  ? selectedResource.getDetails(selectedMunicipality)
                  : selectedResource.details}
              </p>
              <div className="flex items-center text-lg text-blue-600 bg-blue-50 rounded-lg p-4">
                <Phone className="w-5 h-5 mr-3" />
                <span className="font-medium">
                  {typeof selectedResource.getContact === 'function'
                    ? selectedResource.getContact(selectedMunicipality)
                    : selectedResource.contact}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden ${dragInfo.current.isDragging && dragInfo.current.hasDragged ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-30 bg-white/70 backdrop-blur-sm p-3 rounded-lg">
        <h1 className="text-lg sm:text-xl font-bold text-gray-800">沖縄22歳向け社会資源マップ</h1>
        <p className="text-xs sm:text-sm text-gray-600">ドラッグで回転できます</p>
      </div>
      
      {selectedCategory && (
        <button onClick={() => handleNodeClick(() => setSelectedCategory(null))} className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all">
          <X className="w-6 h-6 text-gray-600" />
        </button>
      )}

      <div className="relative w-full h-screen" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchStart={handleMouseDown} onTouchMove={handleMouseMove} onTouchEnd={handleMouseUp} onTouchCancel={handleMouseUp}>
        {selectedCategory === null ? (
            positionedCategories.map(category => (
              <React.Fragment key={category.id}>
                <ConnectionLine from={displayCenter} to={category.position} />
                <CategoryNode item={category} onClick={() => setSelectedCategory(category.id)} />
              </React.Fragment>
            ))
        ) : (
            positionedResources.map(resource => (
              <React.Fragment key={resource.id}>
                <ConnectionLine from={displayCenter} to={resource.position} />
                <ResourceNode item={resource} onClick={() => setSelectedResource(resource)} />
              </React.Fragment>
            ))
        )}

        <CenterNode onClick={() => setSelectedCategory(null)} isCategorySelected={selectedCategory !== null} />

        {selectedCategory && (
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-4 sm:p-6 max-w-md w-11/12 sm:w-full z-20 pointer-events-none">
            <div className="flex items-center mb-3">
              <div className={`${categories.find(c => c.id === selectedCategory)?.color} p-2 rounded-full mr-3`}>
                {React.createElement(categories.find(c => c.id === selectedCategory)?.icon, { className: "w-5 h-5 text-white" })}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">{categories.find(c => c.id === selectedCategory)?.name}</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-3">{categories.find(c => c.id === selectedCategory)?.description}</p>
            <p className="text-xs sm:text-sm text-gray-500">{filteredResources.length}つの社会資源があります</p>
          </div>
        )}
      </div>
    </div>
  );
};



  export default OkinawaSocialResourcesApp;
