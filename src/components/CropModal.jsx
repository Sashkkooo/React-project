import { useState } from "react";
import { createPortal } from "react-dom";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/imageUtils";

export default function CropModal({ image, onClose, onSave }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleCropComplete = (_, areaPixels) => {
        setCroppedAreaPixels(areaPixels);
    };

    const handleSave = async () => {
        if (!croppedAreaPixels) return;
        try {
            const dataUrl = await getCroppedImg(image, croppedAreaPixels);
            onSave(dataUrl);
        } catch (e) {
            console.error("Crop error:", e);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl w-[480px] max-w-[90vw]">
                <div className="relative w-full h-[360px]">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}            // 1:1 as requested
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={handleCropComplete}
                    />
                </div>

                <div className="flex justify-end gap-2 p-4 border-t">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
