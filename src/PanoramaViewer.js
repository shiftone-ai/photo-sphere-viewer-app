// src/PanoramaViewer.js
import React, { useState, useRef, useEffect } from 'react';
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";


const PanoramaViewer = ({ imageUrl }) => {
  const [default_markers, setData] = useState(null); // 読み込んだデータを保持するstate
  const [loading, setLoading] = useState(true); // ロード中かどうかのstate
  const [error, setError] = useState(null); // エラーが発生したかのstate


  useEffect(() => {
    const jsonFilePath = '/assets/default_markers.json';

    fetch(jsonFilePath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(jsonData => {
        setData(jsonData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to load JSON:", error);
        setError(error);
        setLoading(false);
      });

  }, []);

  const viewerRef = useRef(null);
  let markerNum = 0;

  const handleViewerReady = (viewer) => {
    viewerRef.current = viewer;
    console.log(viewerRef);

    // パノラマ画像がクリックされた時のイベントリスナーを追加
    viewer.addEventListener('click', handlePanoramaClick);

    const markersPlugin = viewerRef.current.getPlugin(MarkersPlugin);

  };

  const handlePanoramaClick = (event) => {
    // https://photo-sphere-viewer.js.org/api/classes/Core.events.ClickEvent.html

    const markersPlugin = viewerRef.current.getPlugin(MarkersPlugin);

    const new_marker = {
      // image marker rendered in the 3D scene
      id: 'dynamic' + String(markerNum),
      imageLayer: 'assets/pictos/tent.png',
      size: { width: 94, height: 94 },
      position: { yaw: event.data.yaw, pitch: event.data.pitch },
      tooltip: 'Image embedded in the scene',
      rotation: { yaw: -1 * event.data.yaw, pitch: -1 * event.data.pitch },
    };
    console.log(new_marker);
    markersPlugin.addMarker(new_marker);
    // setMarkerNum(markerNum + 1);
    markerNum = markerNum + 1;
  };


  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  const plugins = [
    [MarkersPlugin, {
      markers: default_markers,
    }]
  ]

  return (
    <div>
      <ReactPhotoSphereViewer
        src={imageUrl}
        height={"100vh"}
        width={"100%"}
        plugins={plugins}
        onReady={handleViewerReady}
      />
    </div>
  );
};

export default PanoramaViewer;